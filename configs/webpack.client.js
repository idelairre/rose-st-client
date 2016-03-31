var autoprefixer = require('autoprefixer');
var constants = require('../app/scripts/constants/constants');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');
var InlineEnviromentVariablesPlugin = require('inline-environment-variables-webpack-plugin');
var path = require('path');
var precss = require('precss');
var webpack = require('webpack');

var METADATA = {
  title: 'Rose St. Community Center',
  favicon: constants.ICON,
  env: process.env.NODE_ENV,
  metadata: {
    image: constants.IMAGE_URL,
    description: constants.DESCRIPTION,
    name: constants.SITE_NAME,
    type: 'website',
    url: process.env.HOSTNAME || 'localhost'
  }
}

module.exports = {
  meta: METADATA,
  target: 'web',
  cache: false,
  context: __dirname + '/app',
  watch: false,
  debug: false,
  entry: [helpers.root('app/scripts/app.js')],
  output: {
    path: helpers.root('static/dist'),
    filename: 'app.js',
    chunkFilename: '[name].[id].js'
  },
  plugins: [
    new webpack.DefinePlugin({__CLIENT__: true, __SERVER__: false, __PRODUCTION__: true, __DEV__: false }),
    new ExtractTextPlugin('[name].css'),
    new webpack.optimize.UglifyJsPlugin({ minimize: true, mangle: false, compress: { warnings: false } }),
    new webpack.optimize.DedupePlugin(), // Search for equal or similar files and deduplicate them in the output. This comes with some overhead for the entry chunk, but can reduce file size effectively.
    new webpack.optimize.OccurenceOrderPlugin(), // Assign the module and chunk ids by occurrence count. Ids that are used often get lower (shorter) ids. This make ids predictable, reduces to total file size and is recommended.
  ],
  module: {
    loaders: [
      { test: /\.json$/, loaders: ['json'] },
      { test: /\.html$/, loader: 'html-loader' },
      { test: /\.css$/, loader: 'style-loader!css-loader!postcss-loader' },
      { test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/, loaders : ['file'] },
      { test: /\.(ico|gif|png|jpg|jpeg|svg|webp)$/, loaders: ['file-loader?context=static&name=/[path][name].[ext]'], exclude: /node_modules/ },
      { test: /\.js$/, loaders: ['ng-annotate', 'babel?cacheDirectory&presets[]=es2015&presets[]=stage-0&plugins[]=transform-function-bind&plugins[]=transform-class-properties&plugins[]=transform-decorators-legacy'], exclude: /node_modules/}
    ],
    noParse: /\.min\.js/
  },
  postcss: function () {
    return {
      defaults: [autoprefixer, precss]
    }
  },
  resolve: {
    root: helpers.root(),
    modulesDirectories: [
      helpers.root('node_modules'),
      helpers.root('node_modules/angular-input-masks/src/node_modules'),
    ],
    extensions: ['', '.json', '.js']
  },
  resolveLoader: {
    root: helpers.root('node_modules')
  },
  node: {
    __dirname: true,
    fs: 'empty',
    global: 'window',
    crypto: 'empty',
    clearImmediate: false,
    setImmediate: false,
    process: true
  }
}
