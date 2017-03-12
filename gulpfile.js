var gulp = require('gulp');
var webpack = require('webpack');
var gulpWebpack = require('webpack-stream');
var named = require('vinyl-named-with-path');
var extend = require('extend');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var plumber = require('gulp-plumber');
var clean = require('gulp-clean');
var exec = require('child_process').exec;
var runSequence = require('run-sequence');
var path = require('path');
var rev = require('gulp-rev-hash3');

var devConfig = {
    module: {
        loaders: [{
            test: /\.html$/,
            loader: 'text'
        }, {
            test: /\.(?:png|jpe?g|gif)(?:\?\s*)?/,
            loader: 'url',
            query: {
                limit: 10000,
                name: '[name]-[hash].[ext]'
            }
        }, {
            test: /\.js$/,
            loader: 'babel',
            exclude: './node_modules/',
            query: {
                presets: ['es2015']
            }
        }, {
            test: /\.css$/,
            exclude: './node_modules/',
            loader: 'style-loader!css-loader'
        }]
    },
    output: {
        // 打包时，依赖包的路径信息将包含在js中
        pathinfo:true,
    },
    watch: false,
    plugins: [
        new webpack.optimize.UglifyJsPlugin('*.js')
    ],
    devtool: 'source-map',
    resolve:{
        modulesDirectories: ['./node_modules/','./todolist/scripts/'],
        alias:{
            'vue': path.resolve(__dirname, './node_modules/vue/dist/vue.min')
        }
    }
};

gulp.task('clean', function() {
    return gulp.src(['./todolist/scripts/dist'], {
            read: false
        })
        .pipe(clean());
});

// 自动添加版本号
gulp.task('rev-static', function(){
    return gulp.src('./todolist/**/*.html')
        .pipe(rev({
            assetsDir:'./todolist'
        }))
        .pipe(gulp.dest('./todolist'));
});

gulp.task('npm-install', function(cb) {
    exec('npm install', function(err, stdout, stderr) {
        console.log('stdout : ' + stdout);
        console.log('stderr : ' + stderr);
        cb(err);
    });
});

gulp.task('npm-prune', function(cb) {
    exec('npm prune', function(err, stdout, stderr) {
        console.log('stdout : ' + stdout);
        console.log('stderr : ' + stderr);
        cb(err);
    });
});

//js开发环境
gulp.task('webpackDev', function() {
    return gulp.src('./todolist/scripts/source/**/*Main.js')
        .pipe(named())
        .pipe(plumber())
        .pipe(gulpWebpack(devConfig))
        .pipe(gulp.dest('./todolist/scripts/dist'));
});

//监控文件变化
gulp.task('watch', function() {
    gulp.watch(['./todolist/scripts/source/**/*Main.js', './todolist/css/source/**/*.css'], ['webpackDev']);
});

gulp.task('default', function() {
    return runSequence('clean', 'npm-install','npm-prune','webpackDev','rev-static', 'watch');
});
gulp.task('dev', ['default']);
