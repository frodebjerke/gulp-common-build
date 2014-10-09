var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('gulp-buffer');
var uglify = require('gulp-uglify');
var _if = require('gulp-if');
var notify = require('gulp-notify');
var jshint = require('gulp-jshint');
var _ = require('./utils');

var args = require('yargs').argv;
var isProduction = !!args.production;

var jsTask = function (path) {
    var options = {
        debug: !isProduction
    };

    var b = browserify(options);
    b.add(path.jsAppFile);

    return b.bundle()
        .on('error', _.plumb.errorHandler)
        .pipe(source('app.bundle.js'))

        .pipe(_if(isProduction, buffer()))
        .pipe(_if(isProduction, uglify()))

        .pipe(gulp.dest(_.join(path.outputBase, 'js/')))
        .pipe(notify('Compiled javascript'));
};

var jsLint = function (path) {
    return gulp.src([path.jsWatch])
        .pipe(jshint(path.jshintrc))
        .pipe(jshint.reporter('default'));
};

var jsWatch = function (path) {
    gulp.watch([path.jsWatch], ['js']);
};

module.exports = function (path) {
  gulp.task('js-lint', jsLint.bind(null, path));
  gulp.task('js', ['js-lint'], jsTask.bind(null, path));
  gulp.task('js-watch', ['js'], jsWatch.bind(null, path));
};
