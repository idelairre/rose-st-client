require('babel-polyfill');

require('babel-register')({
//	only: /app/,
   ignore: /node_modules/,
   plugins: ['transform-class-properties', 'transform-decorators-legacy', 'transform-function-bind'],
   presets: ['es2015', 'stage-0']
});

if (process.env.NODE_ENV !== 'production') {
	if (!require('piping')({hook: true, includeModules: false})) {
		return;
	}
}

try {
	require('./app/scripts/server');
}
catch (error) {
	console.error(error.stack);
}
