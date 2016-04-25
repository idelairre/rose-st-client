var webpack = require('webpack');
var config = require('./webpack.config');
var InlineEnviromentVariablesPlugin = require('inline-environment-variables-webpack-plugin');

config.plugins.unshift(
  new webpack.EnvironmentPlugin(['STRIPE'])
);

config.devtool = 'source-map';

module.exports = config;
