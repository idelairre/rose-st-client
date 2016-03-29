var webpack = require('webpack');
var nodeExternals = require('webpack-node-externals');
var path = require('path');
var helpers = require('./helpers');

var constants = require('../app/scripts/constants/constants');

var METADATA = {
  title: 'Rose St. Community Center',
  favicon: constants.ICON,
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
  target: 'node',
  cache: false,
  context: __dirname,
  debug: false,
  devtool: 'source-map',
  entry: [helpers.root('app/server.js')],
  output: {
    path: helpers.root('dist'),
    filename: 'server.js'
  },
  plugins: [
    new webpack.DefinePlugin({ __CLIENT__: false, __SERVER__: true, __PRODUCTION__: true, __DEV__: false }),
    new webpack.DefinePlugin({ 'process.env': { NODE_ENV: "'production'" } }),
    new webpack.optimize.UglifyJsPlugin({ minimize: true, compress: { warnings: false } }),
  ],
  module: {
    preLoaders: [
    ],
    loaders: [
      { test: /\.json$/, loaders: ['json'] },
      { test: /\.js$/, loaders: ['babel?presets[]=es2015&presets[]=stage-0&plugins[]=transform-function-bind&plugins[]=transform-class-properties&plugins[]=transform-decorators-legacy'], exclude: /node_modules/ }
    ],
    postLoaders: [],
    noParse: /\.min\.js/
  },
  externals: [nodeExternals({
    whitelist: ['webpack/hot/poll?1000']
  })],
  resolve: {
    moduleDirectories: [
      path.resolve('app'),
      path.resolve('node_modules'),
      path.resolve('static')
    ],
    extensions: ['', '.json', '.js']
  },
  node: {
    __dirname: true,
    fs: 'empty',
    global: 'window',
    crypto: 'empty',
    process: true,
    module: false,
    clearImmediate: false,
    setImmediate: false
  }
}
