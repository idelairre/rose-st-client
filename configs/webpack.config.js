var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');
var InlineEnviromentVariablesPlugin = require('inline-environment-variables-webpack-plugin');
var nodeExternals = require('webpack-node-externals');
var path = require('path');
var precss = require('precss');
var webpack = require('webpack');

module.exports = {
  target: 'web',
  cache: false,
  watch: false,
  debug: false,
  entry: ['babel-polyfill', helpers.root('app/scripts/app.js')],
  output: {
    path: 'static',
    filename: 'app.js',
    chunkFilename: '[name].[id].js'
  },
  plugins: [
    new ExtractTextPlugin('[name].css'),
    new webpack.optimize.UglifyJsPlugin({ minimize: true, mangle: false, compress: { warnings: false } }),
    new webpack.optimize.DedupePlugin(), // Search for equal or similar files and deduplicate them in the output. This comes with some overhead for the entry chunk, but can reduce file size effectively.
    new webpack.optimize.OccurenceOrderPlugin(), // Assign the module and chunk ids by occurrence count. Ids that are used often get lower (shorter) ids. This make ids predictable, reduces to total file size and is recommended.
  ],
  module: {
    loaders: [
      { test: /\.json$/, loaders: ['json'] },
      { test: /\.html$/, loader: 'html-loader' },
      { test: /\.css$/, loader: 'style-loader!css-loader!postcss-loader?root=dist' },
      { test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/, loaders : ['file'] },
      { test: /\.(ico|gif|png|jpg|jpeg|svg|webp)$/, loaders: ['file-loader?name=[path][name].[ext]'], exclude: /node_modules/ },
      { test: /\.js$/, loaders: ['ng-annotate', 'babel?cacheDirectory'], exclude: /node_modules/}
    ],
    noParse: [/\.min\.js/, /moment.js/]
  },
  postcss: function () {
    return {
      defaults: [autoprefixer, precss]
    }
  },
  resolve: {
    modulesDirectories: [
      helpers.root('node_modules'),
      helpers.root('node_modules/angular-input-masks/src/node_modules'),
    ],
    extensions: ['', '.json', '.js']
  },
  node: {
    __dirname: true,
    global: true
  }
}
