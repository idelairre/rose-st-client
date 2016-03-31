var webpack = require('webpack');
var config = require('./webpack.config');
var InlineEnviromentVariablesPlugin = require('inline-environment-variables-webpack-plugin');

config.plugins.unshift(
  new webpack.EnvironmentPlugin(['STRIPE']),
  new InlineEnviromentVariablesPlugin({ HOSTNAME: 'https://rose-st-api.herokuapp.com' })
);

module.exports = config;
