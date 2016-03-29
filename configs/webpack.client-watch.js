var webpack = require('webpack');
var config = require('./webpack.client');
var InlineEnviromentVariablesPlugin = require('inline-environment-variables-webpack-plugin');

var wds = { // does this stand for?
  hostname: process.env.HOSTNAME || 'localhost',
  port: 8000
};

config.cache = true;
config.debug = true;
config.devtool = 'cheap-module-eval-source-map';

config.entry.unshift(
  'webpack-dev-server/client?http://' + wds.hostname + ":" + wds.port,
  'webpack/hot/only-dev-server'
);

config.devServer = {
  publicPath: 'http://' + wds.hostname + ':' + wds.port + '/dist',
  inline: false,
  hot: true,
  lazy: false,
  quiet: true,
  noInfo: true,
  headers: { 'Access-Control-Allow-Origin' : '*' },
  host: wds.hostname,
  stats: {
    colors: true,
    hash: false,
    timings: false,
    assets: true,
    chunks: true,
    chunkModules: true,
    modules: false,
    children: true
  }
};

config.output.publicPath = config.devServer.publicPath;
config.output.hotUpdateMainFile = 'update/[hash]/update.json';
config.output.hotUpdateChunkFile = 'update/[hash]/[id].update.js';

config.plugins = [
  new webpack.DefinePlugin({__CLIENT__: true, __SERVER__: false, __PRODUCTION__: false, __DEV__: true}),
  new InlineEnviromentVariablesPlugin({ NODE_ENV: 'development' }),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin()
];

config.module.loaders[0].loaders = ['angular-hmr'].concat(config.module.loaders[0].loaders);

module.exports = config;
