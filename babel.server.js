require('babel-polyfill');

require('babel-register')({
   ignore: /node_modules/,
   presets: ['es2015', 'stage-0']
});

if (process.env.NODE_ENV !== 'production') {
	if (!require('piping')({ hook: true, includeModules: false})) {
		return;
	}
}

try {
	require('./app/server');
} catch (error) {
	console.error(error.stack);
}
