var webpack = require('webpack');
var config = require('./webpack.config');

config.plugins.unshift(new webpack.EnvironmentPlugin(['STRIPE']));

module.exports = config;
