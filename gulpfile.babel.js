var gulp = require('gulp');
var gulpsync = require('gulp-sync')(gulp);
var babel = require('gulp-babel');
var replace = require('gulp-replace-path');
var browserSync = require('browser-sync');
var gulpFilter = require('gulp-filter');
var fs = require('fs');
var $ = require('gulp-load-plugins')(); // loads other gulp plugins
var browserify = require('browserify');
var babelify = require('babelify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var stringify = require('stringify');
var del = require('del');

var bundler = {
  w: null,
  init: function() {
    this.w = watchify(browserify({
      entries: ['./app/scripts/app.js'],
      extensions: ['.js'],
      debug: true
    })
    .transform(stringify({
      extensions: ['.html']
    }))
    .transform(babelify.configure({
      presets: ['es2015', 'stage-0'],
      plugins: ['transform-class-properties', 'transform-decorators-legacy', 'transform-function-bind']
    })))
  },
  bundle: function() {
    return this.w && this.w.bundle()
      .on('start', logger.start)
      .on('error', handleErrors)
      .pipe(source('app.js'))
      .pipe($.ngAnnotate())
      .pipe(gulp.dest('./dist/scripts/'))
      .pipe(browserSync.reload({
        stream: true
      }));
  },
  watch: function() {
    this.w && this.w.on('update', this.bundle.bind(this));
  },
  stop: function() {
    this.w && this.w.close();
  }
};

gulp.task('images', function() {
  return gulp.src('app/images/**/*')
    .pipe($.cache($.imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('dist/images'))
    .pipe($.size());
});

gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: './dist'
    },
    // https: true
  });
  gulp.watch('app/**/*.js', ['scripts']);
  gulp.watch('app/**/*.html', ['scripts']); // html is now js
  gulp.watch('app/**/*.css', ['styles']);
});

//watch scss for changes and render into minified css with nice auto-prefixing
gulp.task('styles', function() {
  return gulp.src(['app/**/*.css', 'node_modules/angular-ui-notification/dist/angular-ui-notification.css'])
    .on('error', handleErrors)
    .pipe($.autoprefixer('last 1 version'))
    .pipe($.concat('main.css'))
    .pipe(gulp.dest('dist/styles'))
    .pipe(browserSync.reload({
      stream: true
    }))
    .pipe($.size());
});

gulp.task('scripts', function() {
  bundler.init();
  return bundler.bundle();
});

gulp.task('html:main', function() { // not in the mood for regex today
  return gulp.src(['app/index.html'])
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.reload({
      stream: true
    }))
  .pipe($.size());
});

gulp.task('html:change-path', function() { // not in the mood for regex today
  var prodUrl = 'https://idelairre.github.io/rose_st_client/';
  return gulp.src(['app/index.html'])
    .pipe(replace(/scripts/g, prodUrl + 'scripts'))
    .pipe(replace(/styles\/main.css/g, prodUrl + 'styles/main.css'))
    .pipe(replace(/favicon.ico/g, prodUrl + 'favicon.ico'))
    .pipe(gulp.dest('dist'))
    .pipe($.size());
});

gulp.task('html:node', function() {
  return gulp.src(['node_modules/angular-ui-bootstrap/**/*.html', '!node_modules/angular-ui-bootstrap/src/**/*.html'])
    .pipe(gulp.dest('dist/uib'))
    .pipe($.size());
});

gulp.task('html:clean', function () {
  return del.sync(['dist/components']);
})

gulp.task('gh-pages', function() {
  return gulp.src('./dist/**/*')
    .pipe($.ghPages());
});

gulp.task('extras', function() {
  return gulp.src(['app/*.txt', 'app/*.ico', 'app/CNAME'])
    .pipe(gulp.dest('dist/'))
    .pipe($.size());
});

gulp.task('minify:js', function() {
  return gulp.src('dist/scripts/**/*.js')
    .pipe($.uglify({
      mangle: false
    }))
    .pipe(gulp.dest('dist/scripts'))
    .pipe($.size());
});

gulp.task('minify:css', function() {
  return gulp.src('dist/styles/**/*.css')
    .pipe($.uncss({
      html: ['app/**/*.html', 'app/index.html']
    }))
    .pipe($.cssnano())
    .pipe(gulp.dest('dist/styles'))
    .pipe($.size());
});

gulp.task('set-production', function() {
  process.env.NODE_ENV = 'production';
});

var logger = (function() {
  return {
    start: function(filepath) {
      console.log(arguments);
      startTime = process.hrtime();
      $.util.log('Bundling', $.util.colors.green(filepath) + '...');
    },

    watch: function(bundleName) {
      $.util.log('Watching files required by', $.util.colors.yellow(bundleName));
    },

    end: function(filepath) {
      var taskTime = process.hrtime(startTime);
      var prettyTime = prettyHrtime(taskTime);
      $.util.log('Bundled', $.util.colors.green(filepath), 'in', $.util.colors.magenta(prettyTime));
    }
  }
})();

var handleErrors = function() {
  var args = Array.prototype.slice.call(arguments);

  $.notify.logLevel(2);

  // Send error to notification center with gulp-notify
  $.notify.onError({
    title: "Compile Error",
    message: "<%= error %>"
  }).apply(this, args);

  // Keep gulp from hanging on this task
  this.emit('end');
};


gulp.task('clean', ['html:clean']);

gulp.task('minify', ['minify:js', 'minify:css']);

gulp.task('build', bundler.stop.bind(bundler));

gulp.task('assets', gulpsync.sync(['images', 'styles']));

gulp.task('html', gulpsync.sync(['html:main', 'html:node']));

gulp.task('html:production', gulpsync.sync(['html:change-path']));

gulp.task('bundle', gulpsync.sync(['assets', 'scripts', 'extras']));

gulp.task('build:production', gulpsync.sync(['set-production', 'html:production', 'bundle', 'minify', 'build']));

gulp.task('deploy', gulpsync.sync(['build:production', 'gh-pages']));

gulp.task('default', ['build']);

gulp.task('watch', gulpsync.sync(['html', 'bundle', 'serve'])),
  function() {
    bundler.watch();
    gulp.watch('app/styles/**/*.css', ['styles']);
    gulp.watch('app/**/*.html', ['scripts']);
  };