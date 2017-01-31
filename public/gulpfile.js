var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
// var ngmin = require('gulp-ngmin');


gulp.task('sass', function () {
  return gulp.src(['./assets/css/scss/variables.scss', './assets/css/scss/mixin.scss',  './assets/css/scss/style.scss', './app/**/*.scss', '!./node_modules/**/*.scss'])
    .pipe(concat("style.css"))
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 16 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('./assets/css/'));
});

gulp.task('sass-min', function () {
  return gulp.src(['./assets/css/scss/variables.scss', './assets/css/scss/mixin.scss',  './assets/css/scss/style.scss', './app/**/*.scss', '!./node_modules/**/*.scss'])
    .pipe(concat("style.min.css"))
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 16 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('./assets/css/'));
});

gulp.task('build', function () {
  return gulp.src(['./app/**/*.module.js', './app/**/*.js', '!./app/build.min.js', '!./app/build.js'])
    .pipe(concat('build.js'))
    .pipe(gulp.dest('./app/'));
});

gulp.task('compress', function () {
  return gulp.src(['./app/**/*.module.js', './app/**/*.js', '!./app/build.min.js', '!./app/build.js'])
    .pipe(concat('build.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./app/'));
});

gulp.task('watch', function () {
  gulp.watch(['./**/*.scss', '!./node_modules/**/*.scss'], ['sass']);
  gulp.watch(['./app/**/*.js', '!./app/build.js'], ['build']);
});


gulp.task('default', ['sass', 'build', 'watch']);