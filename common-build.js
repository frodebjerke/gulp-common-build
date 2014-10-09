var jsTasks = require('./src/js');

module.exports = function (config) {
  js(config);
  gulp.task('all', ['js']);
};
