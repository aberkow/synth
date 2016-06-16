var gulp = require('gulp');
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var webpack = require('webpack-stream');

gulp.task('jshint', function(){
  return gulp.src('js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('sass', function() {
  return gulp.src('scss/*.scss')
  //includePaths makes sure that bourbon and neat are part of the 'sass' task path.
    .pipe(sass({ includePaths: require('node-bourbon', 'node-neat').includePaths,
                includePaths: require('node-neat').includePaths }))
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest('css'));
});

gulp.task('watch', function(){
  gulp.watch('js/*.js', ['jshint']);
  gulp.watch('scss/*.scss', ['sass']);
});

//uses the webpack.config.js file.
gulp.task('webpack', function(){
  return gulp.src('./js/index.js')
    .pipe(webpack( require('./webpack.config.js') ))
    .pipe(gulp.dest('build/js/'));
});



gulp.task('buildStyles', function(){
  return gulp.src('css/*.css')
    .pipe(concat('styles.css'))
    .pipe(cleanCSS())
    .pipe(gulp.dest('build/css'));
});

gulp.task('updateStyles', ['sass', 'buildStyles']);

gulp.task('default', ['jshint', 'sass', 'watch']);

gulp.task('build', ['jshint', 'sass', 'buildStyles', 'webpack']);
