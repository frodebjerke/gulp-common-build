var jsTasks = require('./src/js');
var lessTasks = require('./src/less');
var gulp = require('gulp');

module.exports = function (config) {
  jsTasks(config);
  lessTasks(config);
  gulp.task('all', ['js', 'less']);
};
