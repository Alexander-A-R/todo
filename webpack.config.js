const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');


module.exports = {
	mode: 'development',
	context: path.resolve(__dirname, 'src'),
	devtool: 'source-map',
	entry: {
		main: './js/index.js',
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].[contenthash].js'
	},
	plugins: [
		new HTMLWebpackPlugin({
			template: './index.html',
			inject: 'body'
		}),
		new CleanWebpackPlugin()		
	],
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			}
		]
	}
}