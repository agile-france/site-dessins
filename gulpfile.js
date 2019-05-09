var gulp = require('gulp');
var es = require('event-stream');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var file = require('gulp-file');
var path = require('path');

gulp.task('clean', function (cb) {
  var del = require('del');

  del([
    // delete everything under public directory
    './public/*',
    // except images and docs, very long to generate
    '!./public/img',
    '!./public/docs',
    '!./public/favicons',
    // except Git files
    '!./public/.git',
    '!./public/.gitignore'
  ], cb);
});

gulp.task('clean-img', function (cb) {
  require('del')([
    './public/img',
    './public/docs',
    './public/favicons',
  ], cb);
});

gulp.task('css', ['clean'], function () {
  var minifyCSS = require('gulp-minify-css');

  // concat and minify CSS files and stream CSS
  return gulp.src('./app/assets/css/*.css')
    .pipe(concat('app.css'))
    .pipe(minifyCSS())
    .pipe(rename('app.min.css'))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('html-min', ['clean'], function() {
  var htmlmin = require('gulp-htmlmin');

  return gulp.src('./app/assets/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./public'));
});

gulp.task('image-min', ['clean-img'], function () {
  var imagemin = require('gulp-imagemin');
  var pngquant = require('imagemin-pngquant');

  return gulp.src('./app/assets/img/**/*')
    .pipe(imagemin({
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngquant()]
    }))
    .pipe(gulp.dest('./public/img'));
});

gulp.task('copy-fonts', ['clean'], function() {
  return gulp.src(['./app/assets/fonts/**'])
    .pipe(gulp.dest('./public/fonts'));
});

gulp.task('copy-docs', ['clean'], function() {
  return gulp.src(['./app/assets/docs/**'])
    .pipe(gulp.dest('./public/docs'));
});

gulp.task('copy-libs', ['clean'], function() {
  return gulp.src('./node_modules/fontfaceobserver/fontfaceobserver.js')
    .pipe(gulp.dest('./public/js'));
});

gulp.task('copy-favicons', ['clean-img'], function() {
  return gulp.src(['./app/assets/favicons/**'])
    .pipe(gulp.dest('./public/favicons'));
});

gulp.task('generate-cname', function() {
  if (! process.env.npm_package_config_target_url)
    throw new Error('Must be called from NPM to define "target_url" in config');

  return file('CNAME', process.env.npm_package_config_target_url, { src: true })
    .pipe(gulp.dest('./public'));
});

gulp.task('deploy', ['build', 'generate-cname'], function(cb) {
    var ghPages = require('gh-pages');

    ghPages.publish('./public', {
        clone: path.relative(process.cwd(), path.resolve(__dirname, '.cache/prod')),
        repo: 'git@github.com:AgileFrance/site-conference-2019.git',
        dotfiles: true,
        logger: function(message) {
            console.log(message);
        }
    }, cb);
});

gulp.task('build-fast', ['clean', 'copy-fonts', 'copy-libs', 'css', 'html-min']);
gulp.task('build', ['build-fast', 'image-min', 'copy-favicons', 'copy-docs']);
