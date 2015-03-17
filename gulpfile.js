var gulp = require('gulp');

gulp.task('build', function() {
    gulp.src('./app/assets/**')
    .pipe(gulp.dest('./public'));
});