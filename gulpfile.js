var gulp = require("gulp");
var url = require("url");

var sass = require("gulp-sass");
var imagemin = require("gulp-imagemin");
var autoprefixer = require("gulp-autoprefixer");
var base64 = require("gulp-base64");
var tmodjs = require("gulp-tmod");

var webpack = require("webpack-stream");

var server = require("browser-sync").create();
var proxy = require("http-proxy-middleware");

gulp.task("img", () =>
    gulp.src("src/img/**/*")
        .pipe(imagemin())
        .pipe(gulp.dest("dist/img"))
        .pipe(server.stream())
);

gulp.task("app:copy", () =>
    gulp.src("./src/app/**/*.html", {base: "./src/app"})
        .pipe(gulp.dest("./dist/app"))
        .pipe(server.stream())
);

gulp.task("lib:copy", () =>
    gulp.src("./src/*/lib/**/*", {base: "./src"})
        .pipe(gulp.dest("./dist"))
);

gulp.task("sass", ["img"], function() {
    return gulp.src("./src/sass/**/*.scss")
        .pipe(sass({
            outputStyle: "compressed"
        }).on("error", sass.logError))
        .pipe(autoprefixer({
            "browsers": ["last 2 versions"]
        }))
        .pipe(base64({
            maxImageSize: 12*1024,
            debug: true
        }))
        .pipe(gulp.dest("./dist/css"))
        .pipe(server.stream());
});

gulp.task("tmodjs", function(){
    return gulp.src("./src/tmpl/**/*.tmpl")
            .pipe(tmodjs({
                templateBase: "./src/tmpl"
            }))
            .pipe(gulp.dest("./src/js"));
});

gulp.task("webpack", ["tmodjs"], function() {
    return gulp.src(["./src/js/*.js"])
        .pipe(webpack({
            output: {
                filename: "bundle.js",
              },
        }))
        .pipe(gulp.dest("./dist/js"))
        .pipe(server.stream());
});

gulp.task("serve", ["lib:copy", "app:copy","sass", "img", "webpack", "tmodjs"], function() {

    server.init({
        server: {
            baseDir: "./",
            middleware: [
                // proxy(["/pc/","/mobile/","/list"], {target: "http://report.hustonline.net", changeOrigin: true}),
            ]
        },
        startPath: "./dist/app"
    });

    gulp.watch("./src/app/**/*.html", ["app:copy"]);
    gulp.watch("./src/sass/**/*.scss", ["sass"]);
    gulp.watch("./src/js/*.js", ["webpack"]);
    gulp.watch("./src/app/tmpl/**/*.tmpl", ["webpack", "tmodjs"]);
    gulp.watch("./src/img/**/*", ["img"]);
});

gulp.task("default", ["serve"]);
