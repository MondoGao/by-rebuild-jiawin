var gulp = require('gulp');

var url = require('url');

var sass = require('gulp-sass');
var imagemin = require('gulp-imagemin');
var autoprefixer = require('gulp-autoprefixer');
var base64 = require('gulp-base64');

var webpack = require('webpack-stream');
var tmodjs = require('gulp-tmod');

var server = require('browser-sync').create();
var proxy = require('http-proxy-middleware');

gulp.task('copy:lib', function() {
    return gulp.src('./dep/font/**/*')
        .pipe(gulp.dest('./dist/font/lib'));
});
gulp.task('copy:app', function() {
    return gulp .src('./src/app/**/*.html')
        .pipe(gulp.dest('./dist/app'));
});

gulp.task('copy', ['copy:lib', 'copy:app']);

gulp.task('img', () =>
    gulp.src('src/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'))
);

gulp.task('sass', ['img'], function() {
    return gulp.src('./src/sass/**/*.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(autoprefixer({
            'browsers': ['last 2 versions']
        }))
        .pipe(base64({
            maxImageSize: 12*1024,
            debug: true
        }))
        .pipe(gulp.dest('./dist/css'))
        .pipe(server.reload({stream: true}));
});

gulp.task('tmodjs', function(){
    return gulp.src('./src/app/tmpl/**/*.tmpl')
            .pipe(tmodjs({
                templateBase: './src/app/tmpl'
            }))
            .pipe(gulp.dest('./src/js'));
});

gulp.task('webpack', ['tmodjs'], function() {
    return gulp.src(['./src/js/*.js'])
        .pipe(webpack({
            output: {
                filename: 'bundle.js',
              },
        }))
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('sass:watch', ['sass'], server.reload);
gulp.task('webpack:watch', ['webpack'], server.reload);
gulp.task('app:watch', ['copy:app'], server.reload);

gulp.task('serve', ['copy', 'sass', 'img', 'webpack', 'tmodjs'], function() {

    server.init({
        server: {
            baseDir: "./",
            middleware: [
                // proxy(['/pc/','/mobile/','/list'], {target: 'http://report.hustonline.net', changeOrigin: true}),
            ]
        },
        startPath: "./dist/app"
    });

    gulp.watch("./src/app/**/*.html", ['app:watch']);
    gulp.watch('./src/sass/**/*.scss', ['sass:watch']);
    gulp.watch(['./src/js/*.js', './dep/js/**/*.js'], ['webpack:watch']);
    gulp.watch('./src/img/**/*', ['img']);
});

gulp.task('default', ['serve']);
