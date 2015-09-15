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
var aws = require('aws-sdk');
var s3 = require('vinyl-s3');

const env = require('./js/config');

let bundle = bundleName => {
  var browserifyOpts = {
    entries: [`./js/views/${bundleName}/main.js`],
    paths: ['./node_modules', './js'],
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
      .pipe(gulp.dest('_build/'))
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
  return gulp.src('./scss/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('./_build/'));
});

gulp.task('styles:watch', ['styles'], () => {
  return gulp.watch('./scss/*.scss', ['styles']);
});

gulp.task('spec', shell.task([
  'jest'
]));

gulp.task('spec:watch', () => {
  return gulp.watch('./js/**/*.js', ['spec']);
})

gulp.task('deploy', ['scripts', 'styles'], () => {
  aws.config.region = env.AWS_REGION
  aws.config.update({
    accessKeyId: env.AWS_AKID,
    secretAccessKey: env.AWS_SK
  });
  var awsS3 = new aws.S3();
  
  return gulp.src('./_build/*')
    .pipe(s3.dest(`s3://${env.AWS_BUCKET}/static`, { s3: awsS3 }));

});

gulp.task('develop', ['scripts:watch', 'styles:watch'], () => {  
  gulp.src('./_build/*')
    .pipe(gulp.dest('../.dev-persist/www/static/'));
});

gulp.task('default', ['scripts', 'styles'], () => {

});
