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
	
	var _koaCompress = __webpack_require__(10);
	
	var _koaCompress2 = _interopRequireDefault(_koaCompress);
	
	var _koaCors = __webpack_require__(11);
	
	var _koaCors2 = _interopRequireDefault(_koaCors);
	
	var _fsExtra = __webpack_require__(12);
	
	var _fsExtra2 = _interopRequireDefault(_fsExtra);
	
	var _helpers = __webpack_require__(7);
	
	var _helpers2 = _interopRequireDefault(_helpers);
	
	var _koa = __webpack_require__(13);
	
	var _koa2 = _interopRequireDefault(_koa);
	
	var _koaLogging = __webpack_require__(14);
	
	var _koaLogging2 = _interopRequireDefault(_koaLogging);
	
	var _path = __webpack_require__(6);
	
	var _path2 = _interopRequireDefault(_path);
	
	var _koaEjs = __webpack_require__(15);
	
	var _koaEjs2 = _interopRequireDefault(_koaEjs);
	
	var _nodeSchedule = __webpack_require__(16);
	
	var _nodeSchedule2 = _interopRequireDefault(_nodeSchedule);
	
	var _koaStatic = __webpack_require__(17);
	
	var _koaStatic2 = _interopRequireDefault(_koaStatic);
	
	var _koaUseragent = __webpack_require__(18);
	
	var _koaUseragent2 = _interopRequireDefault(_koaUseragent);
	
	var _constants = __webpack_require__(9);
	
	__webpack_require__(19);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var app = (0, _koa2.default)();
	var router = __webpack_require__(20)();
	var hostname = ({"NODE_ENV":'development'}).HOSTNAME || 'localhost';
	var port = ({"NODE_ENV":'development'}).PORT || 8000;
	
	function getPost(titleUrl) {
	  var posts = _fsExtra2.default.readJsonSync('cache.json', 'utf8');
	  for (var i = 0; posts.length > i; i += 1) {
	    if (posts[i].title_url === titleUrl) {
	      return posts[i];
	    }
	  }
	  return false;
	}
	
	// const task = schedule.scheduleJob({ hour: 0, minute: 0, dayOfWeek: 0 }, function () {
	//   axios.get(`${SERVER_URL}/posts`).then(response => {
	//     if (response.data !== fs.readJsonSync(helpers.root('app/cache.json'), 'utf8')) {
	//       fs.writeJsonSync(helpers.root('app/cache.json'), JSON.stringify(response.data));
	//     }
	//   });
	// });
	
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
	          return this.render('index', { webpackConfig: _webpack2.default });
	
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
	          return this.render('index', { webpackConfig: _webpack2.default });
	
	        case 2:
	        case 'end':
	          return _context2.stop();
	      }
	    }
	  }, _callee2, this);
	}));
	
	app.use((0, _koaStatic2.default)('static'));
	
	app.use((0, _koaCors2.default)());
	
	app.use(router.routes());
	
	app.use(router.allowedMethods());
	
	app.use((0, _koaCompress2.default)());
	
	app.use((0, _koaUseragent2.default)());
	
	app.listen(port, function () {
	  // console.log('args: ', ...args);
	  console.info('==> ✅  Server is listening');
	  console.info('==> 🌎  Go to http://%s:%s', hostname, port);
	});
	
	if (false) {
	  if (module.hot) {
	    console.log('[HMR] Waiting for server-side updates');
	    module.hot.accept();
	    module.hot.addStatusHandler(function (status) {
	      if (status === 'abort') {
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

	/* WEBPACK VAR INJECTION */(function(__dirname) {'use strict';
	
	var webpack = __webpack_require__(4);
	var nodeExternals = __webpack_require__(5);
	var path = __webpack_require__(6);
	var helpers = __webpack_require__(7);
	
	var constants = __webpack_require__(9);
	
	var METADATA = {
	  title: 'Rose St. Community Center',
	  favicon: constants.ICON,
	  metadata: {
	    image: constants.IMAGE_URL,
	    description: constants.DESCRIPTION,
	    name: constants.SITE_NAME,
	    type: 'website',
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
	  plugins: [new webpack.DefinePlugin({ __CLIENT__: false, __SERVER__: true, __PRODUCTION__: true, __DEV__: false }), new webpack.DefinePlugin({ 'process.env': { NODE_ENV: ('development') || "'development'" } })],
	  module: {
	    preLoaders: [],
	    loaders: [{ test: /\.json$/, loaders: ['json'] }, { test: /\.js$/, loaders: ['babel?presets[]=es2015&presets[]=stage-0&plugins[]=transform-function-bind&plugins[]=transform-class-properties&plugins[]=transform-decorators-legacy'], exclude: /node_modules/ }],
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

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("webpack");

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("webpack-node-externals");

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var path = __webpack_require__(6);
	var appRoot = __webpack_require__(8);
	
	module.exports.root = function (args) {
	  args = Array.prototype.slice.call(arguments, 0);
	  return path.join.apply(path, [appRoot.path].concat(args));
	};

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = require("app-root-path");

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = {
	  STRIPE: {
	    PUBLISHABLE_KEY:  true ? 'pk_test_f6MApsp3oUQNaZSejidOONkT' : process.env.STRIPE
	  },
	  ICON: 'https://raw.githubusercontent.com/idelairre/rose_st_client/master/app/favicon.ico',
	  IMAGE_URL: 'https://raw.githubusercontent.com/idelairre/rose_st_client/master/app/images/10612805_674783332611610_5602889381423136186_n.jpg',
	  DESCRIPTION: '74 blocks (with the goal of 100) in East Baltimore where the peace is encouraged by the youth of the community, NOT THE POLICE!',
	  SITE_NAME: 'Rose St. Community Center',
	  SERVER_URL: 'https://rose-st-api.herokuapp.com'
	};

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = require("koa-compress");

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = require("koa-cors");

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = require("fs-extra");

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = require("koa");

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = require("koa-logging");

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = require("koa-ejs");

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = require("node-schedule");

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = require("koa-static");

/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = require("koa-useragent");

/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = require("babel-polyfill");

/***/ },
/* 20 */
/***/ function(module, exports) {

	module.exports = require("koa-router");

/***/ }
/******/ ]);
//# sourceMappingURL=server.js.map