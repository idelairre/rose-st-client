/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDownloadUpdateChunk(chunkId) { // eslint-disable-line no-unused-vars
/******/ 		var chunk = require("./" + "" + chunkId + "." + hotCurrentHash + ".hot-update.js");
/******/ 		hotAddUpdateChunk(chunk.id, chunk.modules);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadManifest(callback) { // eslint-disable-line no-unused-vars
/******/ 		try {
/******/ 			var update = require("./" + "" + hotCurrentHash + ".hot-update.json");
/******/ 		} catch(e) {
/******/ 			return callback();
/******/ 		}
/******/ 		callback(null, update);
/******/ 	}
/******/
/******/ 	
/******/ 	
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "18c379c527dd0cfa2c5b"; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars
/******/ 	
/******/ 	function hotCreateRequire(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var me = installedModules[moduleId];
/******/ 		if(!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if(me.hot.active) {
/******/ 				if(installedModules[request]) {
/******/ 					if(installedModules[request].parents.indexOf(moduleId) < 0)
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					if(me.children.indexOf(request) < 0)
/******/ 						me.children.push(request);
/******/ 				} else hotCurrentParents = [moduleId];
/******/ 			} else {
/******/ 				console.warn("[HMR] unexpected require(" + request + ") from disposed module " + moduleId);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		for(var name in __webpack_require__) {
/******/ 			if(Object.prototype.hasOwnProperty.call(__webpack_require__, name)) {
/******/ 				if(Object.defineProperty) {
/******/ 					Object.defineProperty(fn, name, (function(name) {
/******/ 						return {
/******/ 							configurable: true,
/******/ 							enumerable: true,
/******/ 							get: function() {
/******/ 								return __webpack_require__[name];
/******/ 							},
/******/ 							set: function(value) {
/******/ 								__webpack_require__[name] = value;
/******/ 							}
/******/ 						};
/******/ 					}(name)));
/******/ 				} else {
/******/ 					fn[name] = __webpack_require__[name];
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		function ensure(chunkId, callback) {
/******/ 			if(hotStatus === "ready")
/******/ 				hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			__webpack_require__.e(chunkId, function() {
/******/ 				try {
/******/ 					callback.call(null, fn);
/******/ 				} finally {
/******/ 					finishChunkLoading();
/******/ 				}
/******/ 	
/******/ 				function finishChunkLoading() {
/******/ 					hotChunksLoading--;
/******/ 					if(hotStatus === "prepare") {
/******/ 						if(!hotWaitingFilesMap[chunkId]) {
/******/ 							hotEnsureUpdateChunk(chunkId);
/******/ 						}
/******/ 						if(hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 							hotUpdateDownloaded();
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			});
/******/ 		}
/******/ 		if(Object.defineProperty) {
/******/ 			Object.defineProperty(fn, "e", {
/******/ 				enumerable: true,
/******/ 				value: ensure
/******/ 			});
/******/ 		} else {
/******/ 			fn.e = ensure;
/******/ 		}
/******/ 		return fn;
/******/ 	}
/******/ 	
/******/ 	function hotCreateModule(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 	
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfAccepted = true;
/******/ 				else if(typeof dep === "function")
/******/ 					hot._selfAccepted = dep;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback;
/******/ 				else
/******/ 					hot._acceptedDependencies[dep] = callback;
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfDeclined = true;
/******/ 				else if(typeof dep === "number")
/******/ 					hot._declinedDependencies[dep] = true;
/******/ 				else
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if(idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if(!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if(idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		return hot;
/******/ 	}
/******/ 	
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/ 	
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for(var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/ 	
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailibleFilesMap = {};
/******/ 	var hotCallback;
/******/ 	
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/ 	
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = (+id) + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/ 	
/******/ 	function hotCheck(apply, callback) {
/******/ 		if(hotStatus !== "idle") throw new Error("check() is only allowed in idle status");
/******/ 		if(typeof apply === "function") {
/******/ 			hotApplyOnUpdate = false;
/******/ 			callback = apply;
/******/ 		} else {
/******/ 			hotApplyOnUpdate = apply;
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}
/******/ 		hotSetStatus("check");
/******/ 		hotDownloadManifest(function(err, update) {
/******/ 			if(err) return callback(err);
/******/ 			if(!update) {
/******/ 				hotSetStatus("idle");
/******/ 				callback(null, null);
/******/ 				return;
/******/ 			}
/******/ 	
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotAvailibleFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			for(var i = 0; i < update.c.length; i++)
/******/ 				hotAvailibleFilesMap[update.c[i]] = true;
/******/ 			hotUpdateNewHash = update.h;
/******/ 	
/******/ 			hotSetStatus("prepare");
/******/ 			hotCallback = callback;
/******/ 			hotUpdate = {};
/******/ 			var chunkId = 0;
/******/ 			{ // eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if(hotStatus === "prepare" && hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 		});
/******/ 	}
/******/ 	
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		if(!hotAvailibleFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for(var moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if(!hotAvailibleFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var callback = hotCallback;
/******/ 		hotCallback = null;
/******/ 		if(!callback) return;
/******/ 		if(hotApplyOnUpdate) {
/******/ 			hotApply(hotApplyOnUpdate, callback);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for(var id in hotUpdate) {
/******/ 				if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			callback(null, outdatedModules);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotApply(options, callback) {
/******/ 		if(hotStatus !== "ready") throw new Error("apply() is only allowed in ready status");
/******/ 		if(typeof options === "function") {
/******/ 			callback = options;
/******/ 			options = {};
/******/ 		} else if(options && typeof options === "object") {
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		} else {
/******/ 			options = {};
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}
/******/ 	
/******/ 		function getAffectedStuff(module) {
/******/ 			var outdatedModules = [module];
/******/ 			var outdatedDependencies = {};
/******/ 	
/******/ 			var queue = outdatedModules.slice();
/******/ 			while(queue.length > 0) {
/******/ 				var moduleId = queue.pop();
/******/ 				var module = installedModules[moduleId];
/******/ 				if(!module || module.hot._selfAccepted)
/******/ 					continue;
/******/ 				if(module.hot._selfDeclined) {
/******/ 					return new Error("Aborted because of self decline: " + moduleId);
/******/ 				}
/******/ 				if(moduleId === 0) {
/******/ 					return;
/******/ 				}
/******/ 				for(var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if(parent.hot._declinedDependencies[moduleId]) {
/******/ 						return new Error("Aborted because of declined dependency: " + moduleId + " in " + parentId);
/******/ 					}
/******/ 					if(outdatedModules.indexOf(parentId) >= 0) continue;
/******/ 					if(parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if(!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push(parentId);
/******/ 				}
/******/ 			}
/******/ 	
/******/ 			return [outdatedModules, outdatedDependencies];
/******/ 		}
/******/ 	
/******/ 		function addAllToSet(a, b) {
/******/ 			for(var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if(a.indexOf(item) < 0)
/******/ 					a.push(item);
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/ 		for(var id in hotUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				var moduleId = toModuleId(id);
/******/ 				var result = getAffectedStuff(moduleId);
/******/ 				if(!result) {
/******/ 					if(options.ignoreUnaccepted)
/******/ 						continue;
/******/ 					hotSetStatus("abort");
/******/ 					return callback(new Error("Aborted because " + moduleId + " is not accepted"));
/******/ 				}
/******/ 				if(result instanceof Error) {
/******/ 					hotSetStatus("abort");
/******/ 					return callback(result);
/******/ 				}
/******/ 				appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 				addAllToSet(outdatedModules, result[0]);
/******/ 				for(var moduleId in result[1]) {
/******/ 					if(Object.prototype.hasOwnProperty.call(result[1], moduleId)) {
/******/ 						if(!outdatedDependencies[moduleId])
/******/ 							outdatedDependencies[moduleId] = [];
/******/ 						addAllToSet(outdatedDependencies[moduleId], result[1][moduleId]);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for(var i = 0; i < outdatedModules.length; i++) {
/******/ 			var moduleId = outdatedModules[i];
/******/ 			if(installedModules[moduleId] && installedModules[moduleId].hot._selfAccepted)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/ 	
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		var queue = outdatedModules.slice();
/******/ 		while(queue.length > 0) {
/******/ 			var moduleId = queue.pop();
/******/ 			var module = installedModules[moduleId];
/******/ 			if(!module) continue;
/******/ 	
/******/ 			var data = {};
/******/ 	
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for(var j = 0; j < disposeHandlers.length; j++) {
/******/ 				var cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/ 	
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/ 	
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/ 	
/******/ 			// remove "parents" references from all children
/******/ 			for(var j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if(!child) continue;
/******/ 				var idx = child.parents.indexOf(moduleId);
/******/ 				if(idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// remove outdated dependency from module children
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				for(var j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 					var dependency = moduleOutdatedDependencies[j];
/******/ 					var idx = module.children.indexOf(dependency);
/******/ 					if(idx >= 0) module.children.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/ 	
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/ 	
/******/ 		// insert new code
/******/ 		for(var moduleId in appliedUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				var callbacks = [];
/******/ 				for(var i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 					var dependency = moduleOutdatedDependencies[i];
/******/ 					var cb = module.hot._acceptedDependencies[dependency];
/******/ 					if(callbacks.indexOf(cb) >= 0) continue;
/******/ 					callbacks.push(cb);
/******/ 				}
/******/ 				for(var i = 0; i < callbacks.length; i++) {
/******/ 					var cb = callbacks[i];
/******/ 					try {
/******/ 						cb(outdatedDependencies);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Load self accepted modules
/******/ 		for(var i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			var moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch(err) {
/******/ 				if(typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				} else if(!error)
/******/ 					error = err;
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if(error) {
/******/ 			hotSetStatus("fail");
/******/ 			return callback(error);
/******/ 		}
/******/ 	
/******/ 		hotSetStatus("idle");
/******/ 		callback(null, outdatedModules);
/******/ 	}
/******/
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
/******/ 			loaded: false,
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: hotCurrentParents,
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
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
/******/ 	__webpack_require__.p = "http://localhost:8080/dist";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	module.exports = __webpack_require__(3);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__resourceQuery) {/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	/*globals __resourceQuery */
	if(true) {
		var hotPollInterval = +(__resourceQuery.substr(1)) || (10 * 60 * 1000);
	
		function checkForUpdate(fromUpdate) {
			if(module.hot.status() === "idle") {
				module.hot.check(true, function(err, updatedModules) {
					if(err) {
						if(module.hot.status() in {
								abort: 1,
								fail: 1
							}) {
							console.warn("[HMR] Cannot apply update.");
							console.warn("[HMR] " + err.stack || err.message);
							console.warn("[HMR] You need to restart the application!");
						} else {
							console.warn("[HMR] Update failed: " + err.stack || err.message);
						}
						return;
					}
					if(!updatedModules) {
						if(fromUpdate) console.log("[HMR] Update applied.");
						return;
					}
					__webpack_require__(2)(updatedModules, updatedModules);
					checkForUpdate(true);
				});
			}
		}
		setInterval(checkForUpdate, hotPollInterval);
	} else {
		throw new Error("[HMR] Hot Module Replacement is disabled.");
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, "?1000"))

/***/ },
/* 2 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	module.exports = function(updatedModules, renewedModules) {
		var unacceptedModules = updatedModules.filter(function(moduleId) {
			return renewedModules && renewedModules.indexOf(moduleId) < 0;
		});
	
		if(unacceptedModules.length > 0) {
			console.warn("[HMR] The following modules couldn't be hot updated: (They would need a full reload!)");
			unacceptedModules.forEach(function(moduleId) {
				console.warn("[HMR]  - " + moduleId);
			});
		}
	
		if(!renewedModules || renewedModules.length === 0) {
			console.log("[HMR] Nothing hot updated.");
		} else {
			console.log("[HMR] Updated modules:");
			renewedModules.forEach(function(moduleId) {
				console.log("[HMR]  - " + moduleId);
			});
		}
	};


/***/ },
/* 3 */
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
	
	var _koa = __webpack_require__(11);
	
	var _koa2 = _interopRequireDefault(_koa);
	
	var _koaLogging = __webpack_require__(12);
	
	var _koaLogging2 = _interopRequireDefault(_koaLogging);
	
	var _path = __webpack_require__(9);
	
	var _path2 = _interopRequireDefault(_path);
	
	var _koaEjs = __webpack_require__(13);
	
	var _koaEjs2 = _interopRequireDefault(_koaEjs);
	
	var _nodeSchedule = __webpack_require__(14);
	
	var _nodeSchedule2 = _interopRequireDefault(_nodeSchedule);
	
	var _koaStatic = __webpack_require__(15);
	
	var _koaStatic2 = _interopRequireDefault(_koaStatic);
	
	var _koaUseragent = __webpack_require__(16);
	
	var _koaUseragent2 = _interopRequireDefault(_koaUseragent);
	
	var _constants = __webpack_require__(17);
	
	__webpack_require__(18);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var app = (0, _koa2.default)();
	var router = __webpack_require__(19)();
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
	
	var task = _nodeSchedule2.default.scheduleJob({ hour: 0, minute: 0, dayOfWeek: 0 }, function () {
	  _axios2.default.get(_constants.SERVER_URL + '/posts').then(function (response) {
	    if (response.data !== _fsExtra2.default.readJsonSync(_helpers2.default.root('app/cache.json'), 'utf8')) {
	      _fsExtra2.default.writeJsonSync(_helpers2.default.root('app/cache.json'), JSON.stringify(response.data));
	    }
	  });
	});
	
	var config = __webpack_require__(20);
	
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

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("axios");

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("koa-compress");

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("koa-cors");

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("fs-extra");

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var path = __webpack_require__(9);
	var appRoot = __webpack_require__(10);
	
	// console.log(appRoot.path);
	
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

	module.exports = require("koa");

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = require("koa-logging");

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = require("koa-ejs");

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = require("node-schedule");

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = require("koa-static");

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = require("koa-useragent");

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = {
	  STRIPE: {
	    PUBLISHABLE_KEY:  true ? 'pk_test_f6MApsp3oUQNaZSejidOONkT' : process.env.STRIPE
	  },
	  IMAGE_URL: 'https://raw.githubusercontent.com/idelairre/rose_st_client/master/app/images/10612805_674783332611610_5602889381423136186_n.jpg',
	  DESCRIPTION: '74 blocks (with the goal of 100) in East Baltimore where the peace is encouraged by the youth of the community, NOT THE POLICE!',
	  SITE_NAME: 'Rose St. Community Center',
	  SERVER_URL: 'https://rose-st-api.herokuapp.com'
	};

/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = require("babel-polyfill");

/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = require("koa-router");

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {'use strict';
	
	var webpack = __webpack_require__(21);
	var nodeExternals = __webpack_require__(22);
	var path = __webpack_require__(9);
	var HtmlWebpackPlugin = __webpack_require__(23);
	var helpers = __webpack_require__(8);
	
	var constants = __webpack_require__(17);
	
	var METADATA = {
	  title: 'Rose St. Community Center',
	  script: 'localhost:8000/static/dist/app.js',
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
	  plugins: [new webpack.DefinePlugin({ __CLIENT__: false, __SERVER__: true, __PRODUCTION__: true, __DEV__: false }), new webpack.DefinePlugin({ 'process.env': { NODE_ENV: '"development"' } })],
	  module: {
	    preLoaders: [{ test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/, loaders: ['file?context=static&name=/[path][name].[ext]'], exclude: /node_modules/ }],
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
/* 21 */
/***/ function(module, exports) {

	module.exports = require("webpack");

/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = require("webpack-node-externals");

/***/ },
/* 23 */
/***/ function(module, exports) {

	module.exports = require("html-webpack-plugin");

/***/ }
/******/ ]);
//# sourceMappingURL=server.js.map