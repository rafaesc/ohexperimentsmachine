const merge = require('webpack-merge');
const parts = require("./parts");
const webpackConfig = require("../webpack.config");

var config = merge(
	webpackConfig,
	parts.minify(true)
);

module.exports = config;