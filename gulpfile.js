var gulp = require('gulp');

var url = require('url');

var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var server = require('browser-sync').create();
// var proxy = require('http-proxy-middleware');
var proxytest = require('proxy-middleware');

gulp.task('sass', function() {
    return gulp.src('./src/sass/**/*.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(autoprefixer({
            'browsers': ['last 2 versions']
        }))
        .pipe(gulp.dest('./dist/css'))
        .pipe(server.reload({stream: true}));
});

gulp.task('sass-watch', ['sass'], server.reload);

gulp.task('serve', ['sass'], function() {
    var proxyOptions = url.parse('http://report.hustonline.net');
    proxyOptions.route = '/pc';
    var proxyOptions2 = url.parse('http://report.hustonline.net');
    proxyOptions2.route = '/list';

    server.init({
        server: {
            baseDir: "./",
            middleware: [
                // proxy(['/pc/'], {target: 'http://report.hustonline.net', changeOrigin: true}),
                // proxy(['/mobile/'], {target: 'http://report.hustonline.net', changeOrigin: true}),
                // proxy(['/list'], {target: 'http://report.hustonline.net', changeOrigin: true}),
                proxytest(proxyOptions2), // 配置问题？无法代理到/list
            ]
        },
        startPath: "./src/app/index.html"
    });

    gulp.watch("./src/app/**/*.html").on('change', server.reload);
    gulp.watch('./src/sass/**/*.scss', ['sass-watch']);
});

gulp.task('default', ['serve']);
