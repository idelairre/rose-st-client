exports.id = 0;
exports.modules = {

/***/ 24:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {'use strict';
	
	var webpack = __webpack_require__(16);
	var nodeExternals = __webpack_require__(25);
	var path = __webpack_require__(15);
	var HtmlWebpackPlugin = __webpack_require__(26);
	var helpers = __webpack_require__(27);
	var fs = __webpack_require__(7);
	
	var constants = __webpack_require__(19);
	
	// console.log(helpers.root);
	
	// console.log('index.html path: ', helpers.root('app/index.html'));
	
	// console.log(constants.SITE_NAME);
	
	var METADATA = {
	  title: 'Rose St. Community Center',
	  script: 'localhost:8000/static/dist/app.js',
	  metadata: {
	    image: constants.IMAGE_URL,
	    description: constants.DESCRIPTION,
	    name: constants.SITE_NAME,
	    url: ({"NODE_ENV":'development'}).HOSTNAME || 'localhost'
	  }
	};
	
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
	  plugins: [new webpack.DefinePlugin({ __CLIENT__: false, __SERVER__: true, __PRODUCTION__: true, __DEV__: false }), new webpack.DefinePlugin({ 'process.env': { NODE_ENV: '"development"' } }), new HtmlWebpackPlugin({ template: helpers.root('app/index.html') })
	  // new webpack.ProvidePlugin({ bootstrap: 'bootstrap.css' })
	  ],
	  module: {
	    preLoaders: [{ test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/, loaders: ['file?context=static&name=/[path][name].[ext]'], exclude: /node_modules/ }],
	    loaders: [{ test: /\.json$/, loaders: ['json'] },
	    // { test: /\.html$/, loader: 'html-loader' },
	    { test: /\.css$/, loader: 'style-loader!css-loader!postcss-loader', include: __dirname }, { test: /\.js$/, loaders: ['babel?presets[]=es2015&presets[]=stage-0&plugins[]=transform-function-bind&plugins[]=transform-class-properties&plugins[]=transform-decorators-legacy'], exclude: /node_modules/ }],
	    postLoaders: [],
	    noParse: /\.min\.js/
	  },
	  externals: [nodeExternals({
	    whitelist: ['webpack/hot/poll?1000']
	  })],
	  resolve: {
	    moduleDirectories: [path.resolve('app'), path.resolve('node_modules'), path.resolve('static')],
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
	};
	/* WEBPACK VAR INJECTION */}.call(exports, ""))

/***/ }

};
//# sourceMappingURL=0.4478b266662efca74f7c.hot-update.js.map