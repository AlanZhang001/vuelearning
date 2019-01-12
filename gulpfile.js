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
const autoprefixer = require('autoprefixer');
const precss = require('precss');

// 清理现有文件
gulp.task('clean', function () {
    return gulp.src(['todolist/scripts/dist/', 'todolist/css-build'], { read: false })
        .pipe(clean());
});

gulp.task('webpackDev', gulpShell.task([
    'webpack --progress --watch --config=webpack.config.js'
]));

gulp.task('webpackProd', gulpShell.task([
    'webpack --env.prod --config=webpack.config.js'
]));

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
    return gulp.src(['./todolist/site/**/*.html'],
        {
            base: './'
        })
        .pipe(revHash({
            assetsDir: 'todolist',
            projectPath: './'
        }))
        .pipe(gulp.dest('./'));
});

//压缩css
gulp.task('postcss', function() {
    return gulp.src(['./todolist/css/source/**/*.css'])
        .pipe(plumber())
        .pipe(postcss([
            atImport({
                path: [process.cwd() + '\\node_modules\\',process.cwd() + './todolist/css']
            }),
            precss(),
            autoprefixer(),
            csswring()
        ]))
        .pipe(gulp.dest('./todolist/css-build'));

}).on('error', function(e) {
    console.log('buildError\n', e);
});

gulp.task('watchCss', function() {
    return gulp.watch([
        './todolist/css/**/*.css'
    ], ['postcss']);
});

// 开发环境构建任务
gulp.task('dev', function() {
    return runSequence('npm-prune', 'clean', 'postcss','watchCss', 'webpackDev');
});


gulp.task('default', ['dev']);

// 生产环境构建任务
gulp.task('prod', function() {
    return runSequence('npm-prune', 'npm-install', 'clean', 'postcss', 'webpackProd', 'rev-hash');
});
