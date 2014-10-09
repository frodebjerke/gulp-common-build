var gulp = require('gulp');
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var _if = require('gulp-if');
var plumber = require('gulp-plumber');
var csso = require('gulp-csso');
var prefix = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var _ = require('./utils');
var watch = require('gulp-watch');
var notify = require('gulp-notify');

var args = require('yargs').argv;
var isProduction = !!args.production;

var lessTask = function (path) {
  return handleStream(path);
};

var lessWatch = function (path) {
  watch({ glob: path.lessWatch, emitOnGlob: false }, function () {
    handleStream(path)
      .pipe(notify('Compiled less'));
  });
};

module.exports = function (path) {
  gulp.task('less', lessTask.bind(null, path));
  gulp.task('less-watch', ['less'], lessWatch.bind(null, path));
};

function handleStream(path) {
  return gulp.src(path.less)
    .pipe(plumber(_.plumb))
    .pipe(less())
    .pipe(prefix())
    .pipe(_if(isProduction, csso()))
    .pipe(rename({
      suffix: ".bundle",
    }))
    .pipe(gulp.dest(_.join(path.outputBase, 'less/')));
}
