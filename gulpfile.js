var gulp     = require('gulp'),
    watch    = require('gulp-watch'),
    cleanCSS = require('gulp-clean-css'),
    rename   = require('gulp-rename'),
    del      = require('del');

gulp.task('delete-min', function() {
  return del([
    'build/styles/*.min.css',
    'build/css/'
  ]);
});

gulp.task('minify-css', ['delete-min'], function() {
  return gulp.src('src/css/*.css')
    .pipe(cleanCSS())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('build/styles/'));
});

gulp.task('generate-css', ['delete-min', 'minify-css']);

gulp.task('watch', function() {
  watch('src/css/*.css', function() {
    gulp.start('generate-css');
  })
});