const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = {
	mode: 'development',
	cache: false,
	context: path.resolve(__dirname, 'src'),
	devtool: 'source-map',
	entry: {
		main: './js/index.js',
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].[contenthash].js',
		clean: true
	},
	plugins: [
		new HTMLWebpackPlugin({
			template: './index.html',
			inject: 'body',
			favicon: 'icon.png'
		}),
		new MiniCssExtractPlugin({
			filename: 'style.[contenthash].css'
		})
	],
	module: {
		rules: [
			{
				test: /\.s[ac]ss$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'sass-loader'
				]
			},
			{
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader']
			},
			{
				test: /\.svg$/,
				use: 'file-loader'
			}
		]
	}
}