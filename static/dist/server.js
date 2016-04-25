/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _axios = __webpack_require__(2);
	
	var _axios2 = _interopRequireDefault(_axios);
	
	var _webpack = __webpack_require__(3);
	
	var _webpack2 = _interopRequireDefault(_webpack);
	
	var _koaCompress = __webpack_require__(14);
	
	var _koaCompress2 = _interopRequireDefault(_koaCompress);
	
	var _koaCors = __webpack_require__(15);
	
	var _koaCors2 = _interopRequireDefault(_koaCors);
	
	var _constants = __webpack_require__(16);
	
	var _constants2 = _interopRequireDefault(_constants);
	
	var _fsExtra = __webpack_require__(17);
	
	var _fsExtra2 = _interopRequireDefault(_fsExtra);
	
	var _helpers = __webpack_require__(8);
	
	var _helpers2 = _interopRequireDefault(_helpers);
	
	var _koaConnectHistoryApiFallback = __webpack_require__(18);
	
	var _koaConnectHistoryApiFallback2 = _interopRequireDefault(_koaConnectHistoryApiFallback);
	
	var _koa = __webpack_require__(19);
	
	var _koa2 = _interopRequireDefault(_koa);
	
	var _koaEjs = __webpack_require__(20);
	
	var _koaEjs2 = _interopRequireDefault(_koaEjs);
	
	var _nodeSchedule = __webpack_require__(21);
	
	var _nodeSchedule2 = _interopRequireDefault(_nodeSchedule);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var app = (0, _koa2.default)();
	var router = __webpack_require__(22)();
	var hostname = process.env.HOSTNAME || 'localhost';
	var env = process.env.NODE_ENV || 'development';
	var port = process.env.PORT || 3000;
	
	_webpack2.default.meta = {
	  title: _constants2.default.SITE_NAME,
	  favicon: _constants2.default.ICON,
	  env: process.env.NODE_ENV,
	  metadata: {
	    image: _constants2.default.IMAGE_URL,
	    description: _constants2.default.DESCRIPTION,
	    name: _constants2.default.SITE_NAME,
	    type: 'website',
	    url: process.env.HOSTNAME || 'localhost'
	  }
	};
	
	console.log('[SERVER] hostname: ', hostname);
	console.log('[SERVER] env: ', env);
	
	if (process.env.NODE_ENV === 'development') {
	  var webpack = __webpack_require__(4);
	  var compiler = webpack(_webpack2.default);
	  var webpackDevMiddleware = __webpack_require__(23);
	  var webpackHotMiddleware = __webpack_require__(24);
	
	  app.use(webpackDevMiddleware(compiler, {
	    noInfo: false,
	    publicPath: _webpack2.default.output.publicPath,
	    stats: {
	      colors: true,
	      hash: false,
	      timings: true,
	      assets: true,
	      chunks: true,
	      chunkModules: false,
	      modules: false,
	      children: true,
	      profile: false
	    }
	  }));
	
	  app.use(webpackHotMiddleware(compiler, {
	    log: console.log,
	    path: '/__webpack_hmr',
	    heartbeat: 5 * 1000
	  }));
	}
	
	if (process.env.NODE_ENV === 'production') {
	  var serve = __webpack_require__(25);
	  app.use(serve('static'));
	}
	
	function getPost(titleUrl) {
	  var posts = _fsExtra2.default.readJsonSync(_helpers2.default.root('app/cache.json'), 'utf8');
	  for (var i = 0; posts.length > i; i += 1) {
	    if (posts[i].title_url === titleUrl) {
	      return posts[i];
	    }
	  }
	  return false;
	}
	
	var task = _nodeSchedule2.default.scheduleJob({
	  hour: 0,
	  minute: 0,
	  dayOfWeek: 0
	}, function () {
	  _axios2.default.get(SERVER_URL + '/posts').then(function (response) {
	    if (response.data !== _fsExtra2.default.readJsonSync(_helpers2.default.root('app/cache.json'), 'utf8')) {
	      _fsExtra2.default.writeJsonSync(_helpers2.default.root('app/cache.json'), JSON.stringify(response.data));
	    }
	  });
	});
	
	(0, _koaEjs2.default)(app, {
	  root: _helpers2.default.root('app'),
	  layout: 'index',
	  viewExt: 'html',
	  cache: false,
	  debug: true
	});
	
	router.get('/posts/:title_url', regeneratorRuntime.mark(function _callee(next) {
	  var data;
	  return regeneratorRuntime.wrap(function _callee$(_context) {
	    while (1) {
	      switch (_context.prev = _context.next) {
	        case 0:
	          data = getPost(this.params.title_url);
	
	          Object.assign(_webpack2.default.meta.metadata, {
	            title: data.title,
	            description: data.subheading,
	            publishedTime: data.created_at,
	            modifiedTime: data.updated_at,
	            type: 'article',
	            url: this.request.href
	          });
	          _context.next = 4;
	          return this.render('index', {
	            webpackConfig: _webpack2.default
	          });
	
	        case 4:
	        case 'end':
	          return _context.stop();
	      }
	    }
	  }, _callee, this);
	}));
	
	router.get('*', regeneratorRuntime.mark(function _callee2(next) {
	  return regeneratorRuntime.wrap(function _callee2$(_context2) {
	    while (1) {
	      switch (_context2.prev = _context2.next) {
	        case 0:
	          _context2.next = 2;
	          return this.render('index', {
	            webpackConfig: _webpack2.default
	          });
	
	        case 2:
	        case 'end':
	          return _context2.stop();
	      }
	    }
	  }, _callee2, this);
	}));
	
	app.use((0, _koaCors2.default)());
	
	app.use((0, _koaConnectHistoryApiFallback2.default)());
	
	app.use(router.routes());
	
	app.use(router.allowedMethods());
	
	app.use((0, _koaCompress2.default)());
	
	app.listen(port, function (error) {
	  if (error) {
	    console.error(error);
	  }
	  // console.info('==> ✅  Node vars:', process.env);
	  console.info('==> ✅  Server is listening');
	  console.info('==> 🌎  Go to http://%s:%s', hostname, port);
	});
	
	if (env === 'development') {
	  if (false) {
	    console.log('[HMR] Waiting for server-side updates');
	    module.hot.accept();
	    module.hot.addStatusHandler(function (status) {
	      if (status === "abort") {
	        setTimeout(function () {
	          return process.exit(0);
	        }, 0);
	      }
	    });
	  }
	}

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("axios");

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var webpack = __webpack_require__(4);
	var config = __webpack_require__(5);
	var ExtractTextPlugin = __webpack_require__(7);
	var InlineEnviromentVariablesPlugin = __webpack_require__(11);
	
	var wds = {
	  hostname: process.env.HOSTNAME || 'localhost',
	  port: '8080'
	};
	
	config.cache = true;
	config.debug = true;
	config.watch = true;
	config.devtool = 'source-map';
	
	config.entry.unshift('webpack-dev-server/client/?http://' + wds.hostname + ':' + wds.port, 'webpack-hot-middleware/client?path=/__webpack_hmr&reload=true&timeout=20000');
	
	config.devServer = {
	  hot: true,
	  publicPath: 'http://' + wds.hostname + ':' + wds.port + '/dist',
	  inline: false,
	  lazy: false,
	  quiet: false,
	  noInfo: true,
	  headers: { 'Access-Control-Allow-Origin': '*' },
	  host: wds.hostname
	};
	
	config.output.publicPath = config.devServer.publicPath;
	config.output.hotUpdateMainFile = 'update/[hash]/update.json';
	config.output.hotUpdateChunkFile = 'update/[hash]/[id].update.js';
	
	config.plugins = [new InlineEnviromentVariablesPlugin('NODE_ENV'), new InlineEnviromentVariablesPlugin('HOSTNAME'), new ExtractTextPlugin('[name].css'), new webpack.HotModuleReplacementPlugin(), new webpack.NoErrorsPlugin()];
	
	module.exports = config;

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("webpack");

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var autoprefixer = __webpack_require__(6);
	var ExtractTextPlugin = __webpack_require__(7);
	var helpers = __webpack_require__(8);
	var InlineEnviromentVariablesPlugin = __webpack_require__(11);
	var nodeExternals = __webpack_require__(12);
	var path = __webpack_require__(9);
	var precss = __webpack_require__(13);
	var webpack = __webpack_require__(4);
	
	module.exports = {
	  target: 'node',
	  cache: false,
	  context: helpers.root(),
	  watch: false,
	  debug: false,
	  entry: [helpers.root('app/scripts/app.js')],
	  output: {
	    path: helpers.root('static/dist'),
	    filename: 'app.js',
	    chunkFilename: '[name].[id].js'
	  },
	  plugins: [new ExtractTextPlugin('[name].css'), new webpack.optimize.UglifyJsPlugin({ minimize: true, mangle: false, compress: { warnings: false } }), new webpack.optimize.DedupePlugin(), // Search for equal or similar files and deduplicate them in the output. This comes with some overhead for the entry chunk, but can reduce file size effectively.
	  new webpack.optimize.OccurenceOrderPlugin() // Assign the module and chunk ids by occurrence count. Ids that are used often get lower (shorter) ids. This make ids predictable, reduces to total file size and is recommended.
	  ],
	  module: {
	    loaders: [{ test: /\.json$/, loaders: ['json'] }, { test: /\.html$/, loader: 'html-loader' }, { test: /\.css$/, loader: 'style-loader!css-loader!postcss-loader' }, { test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/, loaders: ['file'] }, { test: /\.(ico|gif|png|jpg|jpeg|svg|webp)$/, loaders: ['file-loader?context=static&name=/[path][name].[ext]'], exclude: /node_modules/ }, { test: /\.js$/, loaders: ['ng-annotate', 'babel?cacheDirectory&presets[]=es2015&presets[]=stage-0&plugins[]=transform-function-bind&plugins[]=transform-class-properties&plugins[]=transform-decorators-legacy'], exclude: /node_modules/ }],
	    noParse: [/\.min\.js/, /moment.js/]
	  },
	  postcss: function postcss() {
	    return {
	      defaults: [autoprefixer, precss]
	    };
	  },
	  // externals: [nodeExternals({
	  //   whitelist: ['webpack-dev-server', 'webpack-hot-middleware', 'webpack']
	  // })], // in order to ignore all modules in node_modules folder
	  resolve: {
	    root: helpers.root(),
	    extensions: ['', '.json', '.js']
	  },
	  node: {
	    __dirname: true
	  }
	};

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("autoprefixer");

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("extract-text-webpack-plugin");

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var path = __webpack_require__(9);
	var appRoot = __webpack_require__(10);
	
	module.exports.root = function (args) {
	  args = Array.prototype.slice.call(arguments, 0);
	  return path.join.apply(path, [appRoot.path].concat(args));
	};

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = require("app-root-path");

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = require("inline-environment-variables-webpack-plugin");

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = require("webpack-node-externals");

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = require("precss");

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = require("koa-compress");

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = require("koa-cors");

/***/ },
/* 16 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = {
	  STRIPE: {
	    PUBLISHABLE_KEY: process.env.NODE_ENV !== 'production' ? 'pk_test_f6MApsp3oUQNaZSejidOONkT' : process.env.STRIPE
	  },
	  ICON: '../../favicon.ico',
	  IMAGE_URL: '../../images/10612805_674783332611610_5602889381423136186_n.jpg',
	  DESCRIPTION: '74 blocks (with the goal of 100) in East Baltimore where the peace is encouraged by the youth of the community, NOT THE POLICE!',
	  SITE_NAME: 'Rose St. Community Center',
	  SERVER_URL: 'https://rose-st-api.herokuapp.com'
	};

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = require("fs-extra");

/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = require("koa-connect-history-api-fallback");

/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = require("koa");

/***/ },
/* 20 */
/***/ function(module, exports) {

	module.exports = require("koa-ejs");

/***/ },
/* 21 */
/***/ function(module, exports) {

	module.exports = require("node-schedule");

/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = require("koa-router");

/***/ },
/* 23 */
/***/ function(module, exports) {

	module.exports = require("koa-webpack-dev-middleware");

/***/ },
/* 24 */
/***/ function(module, exports) {

	module.exports = require("koa-webpack-hot-middleware");

/***/ },
/* 25 */
/***/ function(module, exports) {

	module.exports = require("koa-static");

/***/ }
/******/ ]);
//# sourceMappingURL=server.js.map