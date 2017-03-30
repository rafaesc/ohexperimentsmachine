const gulp = require('gulp');
const webpack = require('webpack');
const gutil = require('gulp-util');
const devConfig = require("./config/webpack.development.js");
const prodConfig = require("./config/webpack.production.js");
const parts = require("./config/parts");
const merge = require('webpack-merge');
const del = require('del');
var PATHS = require('./config/paths');
var browserSync = require('browser-sync').create();

gulp.task("webpack:prod", function(callback) {
	// modify some webpack config options
	var webpackConfig = Object.create(prodConfig);

	del([
		PATHS.build+'/build.min.css',
		PATHS.build+'/build.min.css.map',
		PATHS.build+'/build.min.js',
		PATHS.build+'/build.min.js.map'
	],{force:true});

	// run webpack
	webpack(webpackConfig, function(err, stats) {
		if(err) throw new gutil.PluginError("webpack:prod", err);
		gutil.log("[webpack:prod]", stats.toString({
			colors: true,
			hash: false,
			version: false,
			errorDetails: true,
			chunks: false,
			chunkModules: false,
			modules: false,
		}));
		callback();
	});
});

gulp.task('clean', function() {
    return del([
			PATHS.build+'/build.min.css',
			PATHS.build+'/build.min.css.map',
			PATHS.build+'/build.min.js',
			PATHS.build+'/build.min.js.map',
			PATHS.build+'/assets/img',
		],{force:true});
});


gulp.task("webpack:dev", function(callback) {
	// modify some webpack config options
	var webpackConfig = Object.create(devConfig);

	browserSync.init({
        server: {
            baseDir: "./"
        }
    });

	// run webpack
	webpack(webpackConfig, function(err, stats) {
		if(err) throw new gutil.PluginError("webpack:dev", err);
		gutil.log("[webpack:dev]", stats.toString({
			colors: true,
			hash: false,
			timings: true,
			chunks: false,
			chunkModules: true,
			modules: true,
			children: true,
			version: false,
			cached: false,
			cachedAssets: false,
			reasons: false,
			source: false,
			errorDetails: true
		}));
	});
});