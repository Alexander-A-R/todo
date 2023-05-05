const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');


module.exports = {
	context: path.resolve(__dirname, 'src'),
	entry: {
		main: './js/index.js',
		analythics: './js/analythics.js'
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
	},
	mode: 'development'
}