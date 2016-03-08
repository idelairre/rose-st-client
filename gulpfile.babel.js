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
var argv = require('yargs').argv; // for args parsing
var spawn = require('child_process').spawn;

var OUTPUT = './static';

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
      .pipe(gulp.dest(OUTPUT + '/dist/scripts/'))
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
    .pipe(gulp.dest(OUTPUT + '/dist/images'))
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

gulp.task('styles', function() {
  return gulp.src(['app/**/*.css', 'node_modules/angular-ui-notification/dist/angular-ui-notification.css', '!app/styles/bootstrap.css'])
    .on('error', handleErrors)
    .pipe($.autoprefixer('last 1 version'))
    .pipe($.concat('main.css'))
    .pipe(gulp.dest(OUTPUT + '/dist/styles'))
    .pipe(browserSync.reload({
      stream: true
    }))
    .pipe($.size());
});

gulp.task('bootstrap', function() {
  return gulp.src('app/styles/bootstrap.css')
  .on('error', handleErrors)
  .pipe($.autoprefixer('last 1 version'))
  .pipe($.cssnano())
  .pipe(gulp.dest(OUTPUT + '/dist/styles'))
  .pipe($.size());
});

gulp.task('scripts', function() {
  bundler.init();
  return bundler.bundle();
});

gulp.task('html:main', function() { // not in the mood for regex today
  return gulp.src(['app/index.html'])
    .pipe(gulp.dest(OUTPUT + '/dist'))
    .pipe(browserSync.reload({
      stream: true
    }))
  .pipe($.size());
});

gulp.task('change-path', function() { // not in the mood for regex today
  var prodUrl = 'https://idelairre.github.io/rose_st_client/';
  return gulp.src(['app/index.html'])
    .pipe(replace(/scripts/g, prodUrl + 'scripts'))
    .pipe(replace(/styles\/main.css/g, prodUrl + 'styles/main.css'))
    .pipe(replace(/styles\/bootstrap.css/g, prodUrl + 'styles/bootstrap.css'))
    .pipe(replace(/favicon.ico/g, prodUrl + 'favicon.ico'))
    .pipe(gulp.dest(OUTPUT + '/dist'))
    .pipe($.size());
});

gulp.task('html:node', function() {
  return gulp.src(['node_modules/angular-ui-bootstrap/**/*.html', '!node_modules/angular-ui-bootstrap/src/**/*.html'])
    .pipe(gulp.dest(OUTPUT + '/dist/uib'))
    .pipe($.size());
});

gulp.task('clean', function () {
  return del.sync([OUTPUT + '/dist']);
});

gulp.task('gh-pages', function() {
  return gulp.src('./dist/**/*')
    .pipe($.ghPages());
});

gulp.task('extras', function() {
  return gulp.src(['app/*.txt', 'app/*.ico', 'app/CNAME'])
    .pipe(gulp.dest(OUTPUT + '/dist'))
    .pipe($.size());
});

gulp.task('minify:js', function() {
  return gulp.src(OUTPUT + '/dist/scripts/**/*.js')
    .pipe($.uglify({
      mangle: false
    }))
    .pipe(gulp.dest(OUTPUT + '/dist/scripts'))
    .pipe($.size());
});

gulp.task('minify:css', function() {
  return gulp.src(['dist/styles/**/*.css'])
    .pipe($.uncss({
      html: ['app/index.html']
    }))
    .pipe($.cssnano())
    .pipe(gulp.dest(OUTPUT + '/dist/styles'))
    .pipe($.size());
});

gulp.task('set-production', function() {
  process.env.NODE_ENV = 'production';
});

gulp.task('auto-reload', function() {
  var p;

  gulp.watch('gulpfile.js', spawnChildren);
  spawnChildren();

  function spawnChildren(e) {
    // kill previous spawned process
    if(p) { p.kill(); }

    // `spawn` a child `gulp` process linked to the parent `stdio`
    p = spawn('gulp', [argv.task], {stdio: 'inherit'});
  }
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

gulp.task('minify', ['minify:js']);

gulp.task('build', bundler.stop.bind(bundler));

gulp.task('assets', ['images', 'bootstrap', 'styles']);

gulp.task('html', ['html:main', 'html:node']);

gulp.task('html:production', ['html:node', 'change-path']);

gulp.task('bundle', ['assets', 'extras', 'scripts']);

gulp.task('build:production', gulpsync.sync(['clean', 'set-production', 'bundle', 'minify', 'build']));

gulp.task('serve:production', gulpsync.sync(['build:production', 'html', 'serve']));

gulp.task('deploy', gulpsync.sync(['build:production', 'html:production', 'gh-pages']));

gulp.task('default', ['build']);

gulp.task('watch', gulpsync.sync(['html', 'bundle', 'build'])),
  function() {
    bundler.watch();
    gulp.watch('app/styles/**/*.css', ['styles']);
    gulp.watch('app/**/*.html', ['scripts']);
  };
