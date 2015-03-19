var gulp = require('gulp');
var del = require('del');
var bower = require('gulp-bower');
var wiredep = require('wiredep').stream;
var merge = require('merge-stream');
var sass = require('gulp-sass');

gulp.task('clean', function (cb) {
  del([
    // delete everything under public directory
    'public/*',
    // except Git files
    '!public/.git',
    '!public/.gitignore'
  ], cb);
});

gulp.task('sass', function () {
  gulp.src('app/styles/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('public/css'));
});

gulp.task('copy', ['bower'], function() {
  var html = gulp.src('app/assets/*.html')
    .pipe(wiredep({
      ignorePath: '../'
    }));

  var others = gulp.src(['app/assets/**', '!**/*.html']);

  return merge(html, others)
    .pipe(gulp.dest('public'));
});

gulp.task('bower', function() {
  return bower();
});

gulp.task('build', ['clean', 'copy', 'sass']);
