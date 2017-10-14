const webpack = require('webpack');
const path = require('path');

module.exports = {
	entry: [
		'webpack-dev-server/client?http://localhost:8080',	
		'webpack/hot/only-dev-server',	//模块热替换，配置react-hot-loader插件
		'./src/index.jsx'
	],
	output: {
		publicPath: '/', //设置网站跟目录
		path: path.join(__dirname, '/dist'), //打包目录
		filename: 'bundle.js' //打包文件名
	},
	module: {
		loaders: [{
			test: /\.jsx?$/,
			exclude: /node_modules/,
			loaders: ['react-hot-loader/webpack', 'babel-loader']
		}]
	},
	resolve: { //模块解析规则，提升打包速度
		extensions: ['.js', '.jsx']
	},
	devServer: {	
		contentBase: './dist',	//--contentBase指定目录启动服务器的根目录
		hot: true //服务器启动模块热替换【需要配置插件plugins】，不需要页面刷新
	},
	plugins: [	
		new webpack.HotModuleReplacementPlugin() //模块热替换插件
	]	
};
