var fs = require('fs');
var helpers = require('./helpers');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var nodeExternals = require('webpack-node-externals');
var path = require('path');
var webpack = require('webpack');

var config = {
  target: 'node',
  cache: false,
  context: helpers.root(),
  debug: false,
  devtool: 'source-map',
  entry: ['babel-polyfill', helpers.root('app/server.js')],
  output: {
    path: helpers.root('static/dist'),
    filename: 'server.js'
  },
  plugins: [
    new ExtractTextPlugin('[name].css')
  ],
  module: {
    loaders: [{
      test: /\.json$/,
      loaders: ['json']
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader!postcss-loader'
    }, {
      test: /\.(ico|gif|png|jpg|jpeg|svg|webp)$/,
      loaders: ['file?context=static&name=/[path][name].[ext]'],
      exclude: /node_modules/
    }, {
       test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
       loaders : ['file']
    }, {
      test: /\.js$/,
      loaders: ['babel?presets[]=es2015&presets[]=stage-0'],
      exclude: /node_modules/
    }],
    postLoaders: [],
    noParse: /\.min\.js/
  },
  node: {
    __dirname: true,
    fs: 'empty'
  }
};

if (process.env.NODE_ENV !== 'development') {
  config.externals = [nodeExternals()];
  config.watch = true;
}

module.exports = config;
