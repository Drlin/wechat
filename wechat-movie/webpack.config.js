var path = require('path');


var appPath = path.resolve('__dirname', 'wechat')

module.exports = {
	entry: './app.js',
	output: {
		path: './dist',
		filename: 'js/[name].bundle.js'
	},
	module: {
		//es6
		loaders: []
	}
}