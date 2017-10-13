var webpack = require('webpack');

module.exports={
	entry:[
		
		'./src/index.js'
	],
	output:{
		path:__dirname+'/dist',
		publicPath:'/',//设置网站跟目录【就不用打包图片等资源了】
		filename:'bundle.js'
	},
	resolve:{
		extensions: ['.js', '.jsx']
	},
	module:{
		loaders:[{
			test:/\.jsx?$/,
			exclude:/node_modules/,
			loaders: ['react-hot-loader/webpack', 'babel-loader']
		}]
	},
	
	devServer: {
	    contentBase: './dist',
	    
	}
}