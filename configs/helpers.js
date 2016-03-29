var path = require('path');
var appRoot = require('app-root-path');

module.exports.root = function(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [appRoot.path].concat(args));
}
