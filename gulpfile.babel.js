'use strict';
var gulp = require('gulp');
var gutil = require('gulp-util');
var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');

const APP_PATH = './src/main/webapp/';

gulp.task('scripts', () => {
  var bundler = watchify(browserify({
    entries: [`${APP_PATH}/WEB-INF/js/main.js/`],
    paths: ['./node_modules', `${APP_PATH}/WEB-INF/js`],
    cache: {},
    packageCache: {}
  }));
  var rebundle = () => { 
    gutil.log('bundling');
    bundler
      .transform(babelify)
      .bundle()
        .on('error', gutil.log)
      .pipe(source('bundle.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({loadMaps: true}))
      .pipe(uglify())
        .on('error', gutil.log)
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(`${APP_PATH}/_build/`))
  };
  bundler.on('update', () => rebundle());
  return rebundle();
});

gulp.task('styles', ['styles:watch'], () => {
  return gulp.src(APP_PATH + '/WEB-INF/scss/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest(APP_PATH + '/_build/'));
});

gulp.task('styles:watch', () => {
  return gulp.watch(APP_PATH + "/WEB-INF/scss/*.scss", ['styles']);
});

gulp.task('default', ['scripts', 'styles'], () => {

});