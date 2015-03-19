var gulp = require('gulp');
var del = require('del');
var bower = require('gulp-bower');
var wiredep = require('wiredep').stream;
var es = require('event-stream');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var minifyCSS = require('gulp-minify-css');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');

gulp.task('clean', function (cb) {
  del([
    // delete everything under public directory
    'public/*',
    // except Git files
    '!public/.git',
    '!public/.gitignore'
  ], cb);
});

gulp.task('css', function () {
  // keep stream CSS after Sass pre-processing
  var appFile = gulp.src('./app/styles/*.scss')
    .pipe(sass());
  // concat and minify CSS files and stream CSS
  return es.concat(gulp.src('./app/assets/css/*.css'), appFile)
    .pipe(concat('app.css'))
    .pipe(minifyCSS())
    .pipe(rename('app.min.css'))
    .pipe(gulp.dest('./public/css'));
});
 
gulp.task('image-min', function () {
  return gulp.src('./app/assets/img/*')
    .pipe(imagemin({
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngquant()]
    }))
    .pipe(gulp.dest('./public/img'));
});

gulp.task('copy', ['bower'], function() {
  var html = gulp.src('app/assets/*.html')
    .pipe(wiredep({
      ignorePath: '../'
    }));

  return gulp.src(['app/assets/**', '!app/assets/css/**', '!app/assets/img/**'])

  return es.merge(html, others)
    .pipe(gulp.dest('public'));
});

gulp.task('bower', function() {
  return bower();
});

gulp.task('build', ['clean', 'copy', 'css', 'image-min']);
