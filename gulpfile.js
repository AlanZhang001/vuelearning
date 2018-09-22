// 声明依赖
const gulp = require('gulp');
const gulpShell = require('gulp-shell');
const runSequence = require('run-sequence');

const exec = require('child_process').exec;
const clean = require('gulp-clean');
const revHash = require('gulp-rev-hash3');
const postcss = require('gulp-postcss');
const atImport = require('postcss-import');
const csswring = require('csswring');
const plumber = require('gulp-plumber');

// 清理现有文件
gulp.task('clean', function () {
    return gulp.src(['client/scripts-build/', 'client/css-build'], { read: false })
        .pipe(clean());
});

gulp.task('webpackDev-hot-reload', function(cb) {
    var child = exec('npm run devserver', function(err, stdout, stderr) {
        cb(err);
    });

    child.stdout.on('data', function(data) {
        console.log(data);
    });
});

gulp.task('webpackDev', gulpShell.task([
    'webpack --progress --watch --config=webpack.config.js'
]));

gulp.task('webpackProd', gulpShell.task([
    'webpack --env.prod --config=webpack.config.js'
]));

// 清理现有dll文件
gulp.task('cleanDll', function () {
    return gulp.src(['./client/scripts/dll'], { read: false })
        .pipe(clean());
});

gulp.task('webpackDll', ['cleanDll'], function (cb) {
    exec('webpack -p --config webpack-dll.config.js', function (err, stdout, stderr) {
        console.log('[webpackDll]stdout : ' + stdout);
        console.log('[webpackDll]stderr : ' + stderr);
        cb(err);
    });
});

gulp.task('npm-prune', function(cb) {
    exec('npm prune', function(err, stdout, stderr) {
        if (stdout) {
            console.log('npm prune: ' + stdout);
        }
        cb(err);
    });
});

gulp.task('npm-install', function(cb) {
    exec('npm install', function(err, stdout, stderr) {
        console.log('[npm install]stdout : ' + stdout);
        console.log('[npm install]stderr : ' + stderr);
        cb(err);
    });
});

// 静态资源版本号
gulp.task('rev-hash', function() {
    return gulp.src(['./client/views/**/*.html'],
        {
            base: './'
        })
        .pipe(revHash({
            assetsDir: 'client',
            projectPath: './'
        }))
        .pipe(gulp.dest('./'));
});

//压缩css
gulp.task('postcss', function() {
    return gulp.src(['./client/css/**/*.css'])
        .pipe(plumber())
        .pipe(postcss([
            atImport({
                path: [process.cwd() + '\\node_modules\\',process.cwd() + './client/css']
            }),
            csswring()
        ]))
        .pipe(gulp.dest('./client/css-build'));

}).on('error', function(e) {
    console.log('buildError\n', e);
});

gulp.task('watchCss', function() {
    return gulp.watch([
        './client/css/**/*.css'
    ], ['postcss']);
});

// 开发环境构建任务
gulp.task('dev', function() {
    return runSequence('npm-prune', 'npm-install', 'clean', 'postcss','watchCss', 'webpackDev');
});

// 前端开发环境构建任务
gulp.task('d', function() {
    return runSequence('npm-prune','clean', 'postcss','watchCss', 'webpackDev-hot-reload');
});

gulp.task('default', ['dev']);

// 生产环境构建任务
gulp.task('prod', function() {
    return runSequence('npm-prune', 'npm-install', 'clean', 'postcss', 'webpackProd', 'rev-hash');
});

gulp.task('pub', ['prod']);

// CI构建任务
gulp.task('ci', function() {
    return runSequence('npm-prune', 'npm-install', 'clean', 'postcss', 'webpackProd', 'rev-hash', 'artifacts');
});

// 收集构建结构，供发布使用
gulp.task('artifacts', function (cb) {
    exec('bash sem-prod.sh',
        function(err, stdout, stderr) {
            cb(err);
        }
    );
    //直接解压到frontend 目录即可
    //unzip -o ./.artifacts/${commitId}.zip -d .
});
