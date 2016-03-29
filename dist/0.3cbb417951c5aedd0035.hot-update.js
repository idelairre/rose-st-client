exports.id = 0;
exports.modules = {

/***/ 3:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _axios = __webpack_require__(4);
	
	var _axios2 = _interopRequireDefault(_axios);
	
	var _helpers = __webpack_require__(5);
	
	var _helpers2 = _interopRequireDefault(_helpers);
	
	var _koa = __webpack_require__(7);
	
	var _koa2 = _interopRequireDefault(_koa);
	
	var _koaCompress = __webpack_require__(8);
	
	var _koaCompress2 = _interopRequireDefault(_koaCompress);
	
	var _fsExtra = __webpack_require__(9);
	
	var _fsExtra2 = _interopRequireDefault(_fsExtra);
	
	var _koaStatic = __webpack_require__(10);
	
	var _koaStatic2 = _interopRequireDefault(_koaStatic);
	
	var _koaProxy = __webpack_require__(11);
	
	var _koaProxy2 = _interopRequireDefault(_koaProxy);
	
	var _koaUseragent = __webpack_require__(12);
	
	var _koaUseragent2 = _interopRequireDefault(_koaUseragent);
	
	var _koaRequest = __webpack_require__(13);
	
	var _koaRequest2 = _interopRequireDefault(_koaRequest);
	
	var _koaCors = __webpack_require__(14);
	
	var _koaCors2 = _interopRequireDefault(_koaCors);
	
	var _koaLogging = __webpack_require__(15);
	
	var _koaLogging2 = _interopRequireDefault(_koaLogging);
	
	var _path = __webpack_require__(6);
	
	var _path2 = _interopRequireDefault(_path);
	
	var _koaEjs = __webpack_require__(16);
	
	var _koaEjs2 = _interopRequireDefault(_koaEjs);
	
	var _webpack = __webpack_require__(17);
	
	var _webpack2 = _interopRequireDefault(_webpack);
	
	var _koaWebpackDev = __webpack_require__(18);
	
	var _koaWebpackDev2 = _interopRequireDefault(_koaWebpackDev);
	
	var _koaWebpackHotMiddleware = __webpack_require__(19);
	
	var _koaWebpackHotMiddleware2 = _interopRequireDefault(_koaWebpackHotMiddleware);
	
	var _constants = __webpack_require__(20);
	
	var _htmlCompilerWatcher = __webpack_require__(21);
	
	var _htmlCompilerWatcher2 = _interopRequireDefault(_htmlCompilerWatcher);
	
	__webpack_require__(22);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var app = (0, _koa2.default)();
	var router = __webpack_require__(23)();
	var hostname = ({"NODE_ENV":'development'}).HOSTNAME || 'localhost';
	var port = ({"NODE_ENV":'development'}).PORT || 8000;
	
	var posts = _fsExtra2.default.readJsonSync('cache.json', 'utf8');
	
	function getPost(titleUrl) {
	  for (var i = 0; posts.length > i; i += 1) {
	    console.log(posts[i]);
	    if (posts[i].title_url === titleUrl) {
	      return posts[i];
	    }
	  }
	  return false;
	}
	
	// axios.get(`${SERVER_URL}/posts`).then((response) => {
	//   fs.writeFile('./cache.json', JSON.stringify(response.data), 'utf8', (error) => {
	//     console.error(error);
	//     fs.readFile('./cache.json', 'utf8', (err, data) => {
	//       if (err) throw err;
	//       console.log('cache.json', data.toString());
	//     });
	//   });
	// });
	
	// console.log(getPost('test'));
	
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
	          data = getPost('test');
	
	          Object.assign(config.meta.metadata, {
	            title: data.title,
	            description: data.description,
	            publishedTime: data.created_at,
	            modified_time: data.updated_at,
	            url: this.request.href
	          });
	          console.log(config.meta.metadata);
	          _context.next = 5;
	          return this.render('index', { webpackConfig: config });
	
	        case 5:
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
	
	// function applyMeta(request, data) {
	//   data = JSON.parse(data.body);
	//   Object.assign(META, {
	//     title: data.title,
	//     description: data.description,
	//     publishedTime: data.created_at,
	//     modified_time: data.updated_at,
	//     url: request.href
	//   });
	//   compiler.apply(new HtmlCompilerWatcher(META));
	// }
	
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
//# sourceMappingURL=0.3cbb417951c5aedd0035.hot-update.js.map