exports.id = 0;
exports.modules = {

/***/ 3:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _axios = __webpack_require__(4);
	
	var _axios2 = _interopRequireDefault(_axios);
	
	var _koa = __webpack_require__(5);
	
	var _koa2 = _interopRequireDefault(_koa);
	
	var _koaCompress = __webpack_require__(6);
	
	var _koaCompress2 = _interopRequireDefault(_koaCompress);
	
	var _fs = __webpack_require__(7);
	
	var _fs2 = _interopRequireDefault(_fs);
	
	var _koaStatic = __webpack_require__(8);
	
	var _koaStatic2 = _interopRequireDefault(_koaStatic);
	
	var _koaProxy = __webpack_require__(9);
	
	var _koaProxy2 = _interopRequireDefault(_koaProxy);
	
	var _koaUseragent = __webpack_require__(10);
	
	var _koaUseragent2 = _interopRequireDefault(_koaUseragent);
	
	var _koaRequest = __webpack_require__(11);
	
	var _koaRequest2 = _interopRequireDefault(_koaRequest);
	
	var _koaCors = __webpack_require__(12);
	
	var _koaCors2 = _interopRequireDefault(_koaCors);
	
	var _koaLogging = __webpack_require__(13);
	
	var _koaLogging2 = _interopRequireDefault(_koaLogging);
	
	var _path = __webpack_require__(14);
	
	var _path2 = _interopRequireDefault(_path);
	
	var _coViews = __webpack_require__(15);
	
	var _coViews2 = _interopRequireDefault(_coViews);
	
	var _webpack = __webpack_require__(16);
	
	var _webpack2 = _interopRequireDefault(_webpack);
	
	var _koaWebpackDev = __webpack_require__(17);
	
	var _koaWebpackDev2 = _interopRequireDefault(_koaWebpackDev);
	
	var _koaWebpackHotMiddleware = __webpack_require__(18);
	
	var _koaWebpackHotMiddleware2 = _interopRequireDefault(_koaWebpackHotMiddleware);
	
	var _constants = __webpack_require__(19);
	
	var _htmlCompilerWatcher = __webpack_require__(20);
	
	var _htmlCompilerWatcher2 = _interopRequireDefault(_htmlCompilerWatcher);
	
	__webpack_require__(21);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var app = (0, _koa2.default)();
	var router = __webpack_require__(22)();
	var hostname = ({"NODE_ENV":'development'}).HOSTNAME || 'localhost';
	var port = ({"NODE_ENV":'development'}).PORT || 8000;
	
	// axios.get(`${SERVER_URL}/posts`).then((response) => {
	//   fs.writeFile('./cache.json', JSON.stringify(response.data), 'utf8', (error) => {
	//     console.error(error);
	//     fs.readFile('./cache.json', 'utf8', (err, data) => {
	//       if (err) throw err;
	//       console.log('cache.json', data.toString());
	//     });
	//   });
	// });
	
	if (false) {
	  var config = require('../configs/webpack.server');
	} else {
	  var _config = __webpack_require__(23);
	  var compiler = (0, _webpack2.default)(_config);
	  app.use((0, _koaWebpackDev2.default)(compiler, { noInfo: false }));
	  app.use((0, _koaWebpackHotMiddleware2.default)(compiler));
	}
	
	// let htmlRenderer = new HtmlCompilerWatcher(META, html => {
	//   app.use(function*() {
	//     let req = this.request.href.split('/');
	//     let params = req.slice(req.length - 2, req.length);
	//     if (params[0] === 'posts' && params[1]) {
	//       const options = {
	//         method: 'GET',
	//         url: `${SERVER_URL}/posts/${params[1]}`
	//       };
	//       const response = yield request(options);
	//       this.type = 'text/html';
	//     } else {
	//       this.type = 'text/html';
	//       this.body = html;
	//     }
	//   });
	// });
	
	app.use(regeneratorRuntime.mark(function _callee() {
	  return regeneratorRuntime.wrap(function _callee$(_context) {
	    while (1) {
	      switch (_context.prev = _context.next) {
	        case 0:
	          this.body = (0, _coViews2.default)('static', { map: { html: 'ejs' } });
	          // let req = this.request.href.split('/');
	          // let params = req.slice(req.length - 2, req.length);
	          // if (params[0] === 'posts' && params[1]) {
	          //   const options = {
	          //     method: 'GET',
	          //     url: `${SERVER_URL}/posts/${params[1]}`
	          //   };
	          //   const response = yield request(options);
	          //   this.type = 'text/html';
	          // } else {
	          //   this.type = 'text/html';
	          //   this.body = html;
	          // }
	
	        case 1:
	        case 'end':
	          return _context.stop();
	      }
	    }
	  }, _callee, this);
	}));
	
	// compiler.apply(htmlRenderer);
	
	// let htmlRenderer = new HtmlCompilerWatcher(META, html => {
	//   router.get('*', function *(next) {
	//     this.type = 'text/html';
	//     this.body = html;
	//     console.log(this.body);
	//     yield next;
	//   });
	// });
	
	// router.get('*', function *(next) {
	//   console.log(next);
	//   this.type = 'text/html';
	//   // this.body = html;
	//   yield next;
	// });
	
	// console.log(config.meta);
	
	// console.log(compiler.plugin);
	
	// compiler.run((err, stats) => {
	//
	// });
	//
	// compiler.watch({ // watch options:
	//     aggregateTimeout: 300, // wait so long for more changes
	//     poll: true // use polling instead of native watchers
	// }, (err, stats) => {
	//   // console.log(stats);
	//   // console.error(err);
	// });
	
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
	
	// console.info('environment: ', process.env.NODE_ENV);
	
	// if (process.env.NODE_ENV === 'production') {
	//   app.use(serve(path.join(root, 'static', 'dist')));
	// } else {
	//   app.use(proxy({
	//     host:  `${hostname}:${port}`,
	//     match: /^\/static\//
	//   }));
	// }
	
	app.use((0, _koaCors2.default)());
	
	// app.use(router.routes());
	
	// app.use(router.allowedMethods());
	
	// app.use(compress());
	
	// app.use(userAgent());
	
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
//# sourceMappingURL=0.b2b1c52184e9a6712728.hot-update.js.map