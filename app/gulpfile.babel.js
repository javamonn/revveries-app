'use strict';
var gulp = require('gulp');
var gutil = require('gulp-util');
var browserify = require('browserify');
var strictify = require('strictify');
var watchify = require('watchify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var shell = require('gulp-shell');

require('dotenv').load();

const APP_PATH = './src/main/webapp/';

let bundle = bundleName => {
  var browserifyOpts = {
    entries: [`${APP_PATH}/WEB-INF/js/views/${bundleName}/main.js`],
    paths: ['./node_modules', `${APP_PATH}/WEB-INF/js`],
  };
  var opts = Object.assign({}, watchify.args, browserifyOpts);
  var bundler = watchify(browserify(opts));
  var rebundle = () => { 
    gutil.log('bundling');
    return bundler
      .transform(babelify)
      .transform(strictify)
      .bundle()
        .on('error', gutil.log)
      .pipe(source(`${bundleName}.js`))
      .pipe(buffer())
      .pipe(sourcemaps.init({loadMaps: true}))
      .pipe(uglify())
        .on('error', gutil.log)
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(`${APP_PATH}/_build/`))
  };
  rebundle();
  return {
    bundler,
    rebundle
  }
};

gulp.task('scripts', () => {
  bundle('Cms');
  bundle('Auth');
  bundle('App');
});

gulp.task('scripts:watch', () => {
  var cms = bundle('Cms');
  var auth = bundle('Auth');
  var app = bundle('App');
  cms.bundler.on('update', () => cms.rebundle());
  auth.bundler.on('update', () => auth.rebundle());
  app.bundler.on('update', () => app.rebundle());
});

gulp.task('styles', () => {
  return gulp.src(APP_PATH + '/WEB-INF/scss/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest(APP_PATH + '/_build/'));
});

gulp.task('styles:watch', ['styles'], () => {
  return gulp.watch(APP_PATH + "/WEB-INF/scss/*.scss", ['styles']);
});

gulp.task('spec', shell.task([
  'jest'
]));

gulp.task('spec:watch', () => {
  return gulp.watch(`${APP_PATH}/WEB-INF/js/**/*.js`, ['spec']);
})

gulp.task('develop', ['scripts:watch', 'styles:watch'], () => {  
  
});

gulp.task('default', ['scripts', 'styles'], () => {

});
