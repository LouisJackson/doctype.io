'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var nano = require('gulp-cssnano');
var watch = require('gulp-watch');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('sass', function () {
  gulp.src('sass/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(nano())
    .pipe(gulp.dest('build'));
});

gulp.task('js_app', function () {
   return gulp.src('js/**/*.js')
      .pipe(jshint())
      .pipe(jshint.reporter('default'))
      .pipe(concat('build/app.js'))
      .pipe(uglify())
      .pipe(gulp.dest(''));
});

gulp.task('js_libs', function () {
   return gulp.src(['bower_components/jquery/dist/jquery.min.js'])
      .pipe(jshint())
      .pipe(jshint.reporter('default'))
      .pipe(concat('build/vendors.js'))
      .pipe(uglify())
      .pipe(gulp.dest(''));
});

gulp.task('watch', function() {
	gulp.watch('sass/**/*.scss', ['sass']);
	gulp.watch('js/**/*.js', ['js_app']);
});

gulp.task('default', ['sass', 'js_app', 'js_libs']);