var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var useref = require('gulp-useref');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var minifyCss = require('gulp-minify-css');
var runSequence = require('run-sequence');
var cleanCSS = require('clean-css');
var rename = require('gulp-rename');

var sassOptions = {
	errLogToConsole: true,
	style: 'compact'
};
var autoprefixerOptions = {
	browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
};

gulp.task('sass', function() {
	return gulp.src('scss/build.scss')
		.pipe(sourcemaps.init())
		.pipe(sass(sassOptions))
		.pipe(autoprefixer(autoprefixerOptions))
		.pipe( rename({ suffix: '.min' }) )
		.pipe( minifyCss() )
		.pipe(sourcemaps.write('./maps'))
		.pipe(gulp.dest('dist/'));
})

gulp.task('watch', function() {
	gulp.watch('scss/**/*.scss', ['sass']);
});

gulp.task('default', function(callback) {
	runSequence(['sass', 'watch'],
		callback
	)
});