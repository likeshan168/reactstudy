var gulp = require("gulp");
var gutil = require("gulp-util");
var del = require("del");
var rename = require('gulp-rename');

var src = {
    html: "src/html/*.html",
    vendor: ["vendor/**/*", "bower_components/**/*"],
    style: "src/style/*/index.less",
    assets: "assets/**/*"
};

var dist = {
    root: "dist/",
    html: "dist/",
    style: "dist/style",
    vendor: "dist/vendor",
    assets: "dist/assets"
};

var bin = {
    root: "bin/",
    html: "bin/",
    style: "bin/style",
    vendor: "bin/vendor",
    assets: "bin/assets"
}

var del = require("del");

/***
 * clean build dir
 *  */
function clean(done) {
    del.sync(dist.root);
    done();
}
/**
 * clean bin
 *  */
function cleanBin(done) {
    del.sync(bin.root);
    done();
}
/**
 * copy vendor
 */
function copyVendor() {
    return gulp.src(src.vendor)
        .pipe(gulp.dest(dist.vendor));
}
/**
 * copy assets
 */
function copyAssets() {
    return gulp.src(src.assets)
        .pipe(gulp.dest(dist.assets));
}
/**
 * copy dist
 */
function copyDist() {
    return gulp.src(dis.root + '**/*')
        .pipe(gulp.dest(bin.root));
}
/**
 * html
 */
function html() {
    return gulp.src(src.html)
        .pipe(gulp.dest(dist.html));
}

var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var cached = require('gulp-cached');
/**
 * style
 */
function style() {
    return gulp.src(src.style)
        .pipe(cached('style'))
        .pipe(less())
        .on('error', handleError)
        .pipe(autoprefixer({
            browsers: ['last 3 version']
        }))
        .pipe(gulp.dest(dist.style))
}

exports.style = style;

function handleError(err) {
    if (err.message) {
        console.log(err.message);
    } else {
        console.log(err);
    }
    this.emit('end');
}
/**
 * webpack
 */
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var webpackConfig = require("./webpack.config.js");
var devConfig, devCompiler;

devConfig = Object.create(webpackConfig);
devConfig.devtool = "sourcemap";
devConfig.debug = true;
devCompiler = webpack(devConfig);

function webpackDevelopment(done) {
    devCompiler.run(function (err, stats) {
        if (err) {
            throw new gutil.PluginError("webpack:build-dev", err);
        }
        gutil.log("[webpack:build-dev]", stats.toString({
            colors: true
        }));
        done();
    });
}

/**
 * [webpackProduction description]
 * production 任务中添加了压缩和打包优化组件，且没有 sourcemap
 * @param  {Function} done [description]
 * @return {[type]}        [description]
 */
function webpackProduction(done) {
    var config = Object.create(webpackConfig);
    config.plugins = config.plugins.concat(
        new webpack.DefinePlugin({
            "process.env": {
                "NODE_ENV": "production"
            }
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin()
    );

    webpack(config, function (err, stats) {
        if (err) throw new gutil.PluginError("webpack:build", err);
        gutil.log("[webpack:production]", stats.toString({
            colors: true
        }));
        done();
    });
}

var connect = require('gulp-connect');
var rest = require("connect-rest");
var mocks = require('./mocks');

function connectServer(done) {
    connect.server({
        root: dist.root,
        port: 8080,
        livereload: true,
        middleware: function (connect, opt) {
            return [rest.rester({
                context: "/"
            })]
        }
    });
    mocks(rest);
    done();
}

function watch() {
    gulp.watch(src.html, html);
    gulp.watch("src/**/*.js", webpackDevelopment);
    gulp.watch("src/**/*.less", style);
    gulp.watch("dist/**/*").on('change', function (file) {
        gulp.src('dist/')
            .pipe(connect.reload());
    });
}


gulp.task("default", gulp.series(
    clean,
    gulp.parallel(copyAssets, copyVendor, html, style, webpackDevelopment),
    connectServer,
    watch
));

gulp.task("build", gulp.series(
  clean, 
  gulp.parallel(copyAssets, copyVendor, html, style, webpackProduction), 
  cleanBin, 
  copyDist, 
  function(done) {
    console.log('build success');
    done();
  }
));

function reload() {
  connect.reload();
}