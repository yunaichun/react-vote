const webpack = require('webpack');
const path = require('path');

module.exports = {
	entry: [
		'webpack-dev-server/client?http://localhost:8080',	
		'webpack/hot/only-dev-server',	
		'./src/index.jsx'
	],
	output: {
		path: path.join(__dirname, '/dist'),
		publicPath: '/', //设置网站跟目录【就不用打包图片等资源了】
		filename: 'bundle.js'
	},
	resolve: {
		extensions: ['.js', '.jsx']
	},
	module: {
		loaders: [{
			test: /\.jsx?$/,
			exclude: /node_modules/,
			loaders: ['react-hot-loader/webpack', 'babel-loader']
		}]
	},
	devServer: {	
		contentBase: './dist',	
		hot: true
	},
	plugins: [	
		new webpack.HotModuleReplacementPlugin()
	]	
};
