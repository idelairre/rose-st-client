exports.id = 0;
exports.modules = {

/***/ 3:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _axios = __webpack_require__(4);
	
	var _axios2 = _interopRequireDefault(_axios);
	
	var _koaCompress = __webpack_require__(5);
	
	var _koaCompress2 = _interopRequireDefault(_koaCompress);
	
	var _koaCors = __webpack_require__(6);
	
	var _koaCors2 = _interopRequireDefault(_koaCors);
	
	var _fsExtra = __webpack_require__(7);
	
	var _fsExtra2 = _interopRequireDefault(_fsExtra);
	
	var _helpers = __webpack_require__(8);
	
	var _helpers2 = _interopRequireDefault(_helpers);
	
	var _koa = __webpack_require__(10);
	
	var _koa2 = _interopRequireDefault(_koa);
	
	var _koaLogging = __webpack_require__(11);
	
	var _koaLogging2 = _interopRequireDefault(_koaLogging);
	
	var _path = __webpack_require__(9);
	
	var _path2 = _interopRequireDefault(_path);
	
	var _koaProxy = __webpack_require__(12);
	
	var _koaProxy2 = _interopRequireDefault(_koaProxy);
	
	var _koaEjs = __webpack_require__(13);
	
	var _koaEjs2 = _interopRequireDefault(_koaEjs);
	
	var _koaRequest = __webpack_require__(14);
	
	var _koaRequest2 = _interopRequireDefault(_koaRequest);
	
	var _nodeSchedule = __webpack_require__(15);
	
	var _nodeSchedule2 = _interopRequireDefault(_nodeSchedule);
	
	var _koaStatic = __webpack_require__(16);
	
	var _koaStatic2 = _interopRequireDefault(_koaStatic);
	
	var _koaUseragent = __webpack_require__(17);
	
	var _koaUseragent2 = _interopRequireDefault(_koaUseragent);
	
	var _webpack = __webpack_require__(18);
	
	var _webpack2 = _interopRequireDefault(_webpack);
	
	var _koaWebpackDev = __webpack_require__(19);
	
	var _koaWebpackDev2 = _interopRequireDefault(_koaWebpackDev);
	
	var _koaWebpackHotMiddleware = __webpack_require__(20);
	
	var _koaWebpackHotMiddleware2 = _interopRequireDefault(_koaWebpackHotMiddleware);
	
	var _constants = __webpack_require__(21);
	
	__webpack_require__(22);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var app = (0, _koa2.default)();
	var router = __webpack_require__(23)();
	var hostname = ({"NODE_ENV":'development'}).HOSTNAME || 'localhost';
	var port = ({"NODE_ENV":'development'}).PORT || 8000;
	
	function getPost(titleUrl) {
	  var posts = _fsExtra2.default.readJsonSync('cache.json', 'utf8');
	  for (var i = 0; posts.length > i; i += 1) {
	    console.log(posts[i]);
	    if (posts[i].title_url === titleUrl) {
	      return posts[i];
	    }
	  }
	  return false;
	}
	
	var task = _nodeSchedule2.default.scheduleJob({ hour: 0, minute: 0, dayOfWeek: 0 }, function () {
	  var options = {
	    method: 'GET',
	    url: _constants.SERVER_URL + '/posts'
	  };
	  _axios2.default.get(_constants.SERVER_URL + '/posts').then(function (response) {
	    _fsExtra2.default.writeJsonSync('cache.json', JSON.stringify(response.data));
	    console.log(_fsExtra2.default.readJsonSync('cache.json', 'utf8'));
	  });
	});
	
	var config = __webpack_require__(24);
	
	(0, _koaEjs2.default)(app, {
	  root: _helpers2.default.root('app'),
	  layout: 'index',
	  viewExt: 'html',
	  cache: false,
	  debug: true
	});
	
	app.use((0, _koaStatic2.default)('static'));
	
	router.get('/posts/:title_url', regeneratorRuntime.mark(function _callee(next) {
	  var data;
	  return regeneratorRuntime.wrap(function _callee$(_context) {
	    while (1) {
	      switch (_context.prev = _context.next) {
	        case 0:
	          data = getPost(this.params.title_url);
	
	          Object.assign(config.meta.metadata, {
	            title: data.title,
	            description: data.subheading,
	            publishedTime: data.created_at,
	            modifiedTime: data.updated_at,
	            type: 'article',
	            url: this.request.href
	          });
	          _context.next = 4;
	          return this.render('index', { webpackConfig: config });
	
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
	          return this.render('index', { webpackConfig: config });
	
	        case 2:
	        case 'end':
	          return _context2.stop();
	      }
	    }
	  }, _callee2, this);
	}));
	
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
	
	if (true) {
	  if (true) {
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

/***/ }

};
//# sourceMappingURL=0.10f8b6b142ae0b18c400.hot-update.js.map