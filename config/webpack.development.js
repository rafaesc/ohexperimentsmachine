const merge = require('webpack-merge');
const parts = require("./parts");
const webpackConfig = require("../webpack.config");
const PATHS      = require('./paths');

var common = {
  watch : true,
  devtool : "#nosources-source-map"
};

var config = merge(
	webpackConfig,
	common,
	parts.minify(false)
);

module.exports = config;
