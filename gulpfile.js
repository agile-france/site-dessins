var gulp = require('gulp');
var del = require('del');

gulp.task('clean', function (cb) {
  del([
    // delete everything under public directory
    'public/*',
    // except Git files
    '!public/.git',
    '!public/.gitignore'
  ], cb);
});

gulp.task('build', ['clean'], function() {
  return gulp.src('app/assets/**')
    .pipe(gulp.dest('public'));
});
