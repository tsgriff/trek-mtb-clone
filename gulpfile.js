var gulp = require('gulp'),
  concat = require('gulp-concat'),
  annotate = require('gulp-ng-annotate'),
  sass = require('gulp-sass');

var paths = {
  jsSource: ['Public/app/app.js', 'Public/app/**/*.js'],
  cssSource: ['Public/app/**/*.sass'],
  viewsSource: ['Public/**/*.html'],
  imagesSource: ['Public/images/**/*.jpg'],
  photoSource: ['Photos/**/*.*']
};

gulp.task('js',function() {
  gulp.src(paths.jsSource)
    .pipe(annotate())
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('./dist'))
});

gulp.task('css', function() {
  gulp.src(paths.cssSource)
    .pipe(sass())
    .pipe(concat('bundle.css'))
    .pipe(gulp.dest('./dist'))
});

gulp.task('views', function() {
  gulp.src(paths.viewsSource)
    .pipe(gulp.dest('./dist'))
});

gulp.task('images', function() {
  gulp.src(paths.imagesSource)
    .pipe(gulp.dest('./dist'))
});

gulp.task('photos', function() {
  gulp.src(paths.photoSource)
    .pipe(gulp.dest('./dist/Photos'))
});

gulp.task('watch', function() {
  gulp.watch(paths.jsSource, ['js']);
  gulp.watch(paths.cssSource, ['css']);
  gulp.watch(paths.imagesSource, ['images']);
  gulp.watch(paths.viewsSource, ['views']);
  gulp.watch(paths.photoSource, ['photos']);
});

gulp.task('default', ['js', 'css', 'views', 'photos', 'images', 'watch']);
