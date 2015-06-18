var gulp = require('gulp');
var babel = require('gulp-babel');
var gutil = require('gulp-util');
var browserify = require('browserify');
var watchify = require('watchify');

gulp.task('js', () => {
  return gulp
    .src((['./js/**/*.js'])
    .pipe(babel())
    .pipe(
});

gulp.task('default', () => {

});
