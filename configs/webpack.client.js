var webpack = require('webpack');
var path = require('path');
var autoprefixer = require('autoprefixer');
var precss = require('precss');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');

module.exports = {
  target: 'web',
  cache: false,
  context: __dirname,
  watch: false,
  debug: false,
  devtool: false,
  entry: [helpers.root('app/scripts/app.js')],
  output: {
    path: path.join(__dirname, '../static/dist'),
    publicPath: path.join(__dirname, '../static/dist'),
    filename: 'app.js',
    chunkFilename: '[name].[id].js'
  },
  plugins: [
    new webpack.DefinePlugin({__CLIENT__: true, __SERVER__: false, __PRODUCTION__: true, __DEV__: false }),
    new webpack.DefinePlugin({ 'process.env' : { NODE_ENV: "'development'" } }),
    new webpack.optimize.UglifyJsPlugin({ minimize: true, mangle: false, compress: { warnings: true } }),
    new ExtractTextPlugin('[name].css'),
    new webpack.optimize.DedupePlugin(), // Search for equal or similar files and deduplicate them in the output. This comes with some overhead for the entry chunk, but can reduce file size effectively.
    new webpack.optimize.OccurenceOrderPlugin(), // Assign the module and chunk ids by occurrence count. Ids that are used often get lower (shorter) ids. This make ids predictable, reduces to total file size and is recommended.
  ],
  module: {
    loaders: [
      { test: /\.json$/, loaders: ['json'] },
      { test: /\.html$/, loader: 'html-loader' },
      { test: /\.css$/, loader: 'style-loader!css-loader!postcss-loader' },
      { test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/, loaders : ['file'] },
      { test: /\.(ico|gif|png|jpg|jpeg|svg|webp)$/, loaders: ['file?context=static&name=/[path][name].[ext]'], exclude: /node_modules/ },
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
    moduleDirectories: [
      helpers.root('app'),
      helpers.root('node_modules'),
      helpers.root('static')
    ],
    extensions: ['', '.json', '.js']
  },
  node: {
    __dirname: true,
    fs: 'empty',
    global: 'window',
    crypto: 'empty',
    clearImmediate: false,
    setImmediate: false
  }
}
