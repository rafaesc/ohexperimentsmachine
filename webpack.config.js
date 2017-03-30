var webpack = require('webpack');
var path = require('path');
var PATHS = require('./config/paths');
var merge = require('webpack-merge');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractCss = new ExtractTextPlugin("build.min.css");

var common = {
	entry: './src/main.js',
	output: {
		path: PATHS.build,
		publicPath: '/dist/',
		filename: 'build.min.js'
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				loader: extractCss.extract({
					fallbackLoader: "style-loader",
					loader: "css-loader?sourceMap"
				})
			},
			{
				test: /\.scss$/,
				loader: extractCss.extract({
					fallbackLoader: 'style-loader',
					loader: 'css-loader?sourceMap!postcss-loader?sourceMap!sass-loader?sourceMap'
				})
			},
			{
				test: /\.(png|jpg|gif|svg)$/,
				loader: 'file-loader',
				query: {
					name: '[path][name].[ext]'
				}
			},
			{
				test: /\.vue$/,
				loader: 'vue-loader'
			},
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel-loader'
			}
		]
	},
	plugins: [
		extractCss
	],
	resolve: {
		alias: {
			'vue$': 'vue/dist/vue',
			'TweenLite': path.join(__dirname,'src/vendor/TweenLite.min.js'),
			'CSSPlugin': path.join(__dirname,'src/vendor/CSSPlugin.min.js')
		}
	},
	devServer: {
		historyApiFallback: true,
		noInfo: true
	}
}

var config = common;

module.exports = config;
