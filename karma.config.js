// Karma configuration
// Generated on Wed Mar 09 2016 21:57:08 GMT-0500 (Eastern Standard Time)

var path = require('path');
var webpack = require('webpack');
var webpackConfig = require('./configs/webpack.config');

webpackConfig.entry = './app/scripts/app.js';

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['angular', 'jasmine', 'sinon'],

    angular: ['mocks', 'messages', 'resource'],

    // list of files / patterns to load in the browser
    files: [
      './node_modules/reflect-metadata/Reflect.js',
      './tests/**/**.spec.js'
    ],

    // list of files to exclude
    exclude: [],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      './tests/**/**.spec.js': ['webpack', 'sourcemap']
    },

    webpack: webpackConfig,

    webpackMiddleware: {
      noInfo: false,
      quiet: true
    },

    plugins: [
      require('karma-angular'),
      require('karma-webpack'),
      require('karma-jasmine'),
      require('karma-sinon'),
      require('karma-mocha-reporter'),
      require('karma-sourcemap-loader'),
      require('karma-chrome-launcher')
    ],

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['mocha'],

    mochaReporter: {
      output: 'noFailures'
    },

    // web server port
    port: 8000,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],

    // [PhantomJS, Chrome, Firefox],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
