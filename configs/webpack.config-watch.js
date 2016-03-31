var webpack = require('webpack');
var config = require('./webpack.config');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var InlineEnviromentVariablesPlugin = require('inline-environment-variables-webpack-plugin');

var wds = {
  hostname: process.env.HOSTNAME || 'localhost',
  port: '8080'
};

config.cache = true;
config.debug = true;
config.watch = true;
config.devtool = 'eval';

config.entry.unshift(
  'webpack-dev-server/client/?http://' + wds.hostname + ':' + wds.port,
  'webpack-hot-middleware/client?path=/__webpack_hmr&reload=true&timeout=20000'
);

config.devServer = {
  hot: true,
  publicPath: 'http://' + wds.hostname + ':' + wds.port + '/dist',
  inline: false,
  lazy: false,
  quiet: true,
  noInfo: false,
  headers: { 'Access-Control-Allow-Origin' : '*' },
  host: wds.hostname
};

config.output.publicPath = config.devServer.publicPath;
config.output.hotUpdateMainFile = 'update/[hash]/update.json';
config.output.hotUpdateChunkFile = 'update/[hash]/[id].update.js';

config.plugins = [
  new InlineEnviromentVariablesPlugin({ NODE_ENV: 'development' }),
  new InlineEnviromentVariablesPlugin({ HOSTNAME: 'localhost' }),
  new ExtractTextPlugin('[name].css'),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin()
];


module.exports = config;
