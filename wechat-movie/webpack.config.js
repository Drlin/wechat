var path = require('path');
var fs = require('fs');
var webpack = require('webpack');

var distPath = path.resolve('__dirname', 'build');
var appPath = path.resolve('__dirname', 'wechat');

var nodeModules = {};
fs.readdirSync('node_modules')
.filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
})
.forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
});

module.exports = {
	entry: './app.js',
	output: {
		path: distPath,
		filename: '[name].bundle.js'
	},
	// 打包node项目
	target: 'node',
	externals: nodeModules,
	module: {
		//es6
		loaders: [{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel-loader',
		}]
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			// 最紧凑的输出
			beautify: false,
			// 删除所有的注释
			comments: false,
			compress: {
			// 在UglifyJs删除没有用到的代码时不输出警告
			warnings: false,
			// 删除所有的 `console` 语句，可以兼容ie浏览器
			drop_console: true,
			// 内嵌定义了但是只用到一次的变量``
			collapse_vars: true,
			// 提取出出现多次但是没有定义成变量去引用的静态值
			reduce_vars: true
		})
	]
	// resolve: {
 //        extensions: ['', '.js', '.json']
 //    }
}