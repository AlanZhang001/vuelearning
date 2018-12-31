/*global module*/
const webpack = require('webpack');
const path = require('path');
const glob = require('glob');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const serverConfig = require('./server/config').server;
var entryMap = getEntrys();

module.exports = env => {
    var isProdEnv = env && env.prod;

    return {
        entry: entryMap,
        resolve: {
            modules: [
                './client/scripts',
                'node_modules'
            ],
            alias: {
                'vue': isProdEnv ? 'vue/dist/vue.min' : 'vue/dist/vue'
            }
        },
        resolveLoader: {
            alias: {
                'text': 'text-loader'
            }
        },
        amd: {
            $: true,
            jQuery: true
        },
        externals: {
            jquery: 'jQuery'
        },
        module: {
            rules: [{
                test: /\.html$/,
                loader: 'text-loader'
            }, {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            }, {
                test: /\.vue$/,
                loader: 'vue-loader'
            }, {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        plugins: ['syntax-dynamic-import']
                    }
                }
            }]
        },
        // 热加载
        devServer: {
            // 表示静态资源服务器的根目录是/static
            contentBase: path.join(__dirname, './client/'),
            // 表示将打包的静态资源放在 / 目录的'/scripts-build/'中
            // 在entry中，结构是 {'app/semLandingHK/hkMian.js':'app/semLandingHK/hkMian.js'}(简称{name:path})
            // devServer这里publicPath的作用是：publicPath + path，是页面上访问hkMian.js的路径，即：/scripts-build/app/semLandingHK/hkMian.js
            publicPath: '/scripts-build/',
            port: 8878,
            open: true,
            hot: true,
            progress: true,
            openPage: '/spread',
            overlay: true,
            inline: true,
            compress: true,
            clientLogLevel: 'info',
            proxy: {
                '/': {
                    target: 'http://localhost:' + serverConfig.port,
                    changeOrigin: true,
                    secure: false
                }
            }
        },
        devtool: isProdEnv ? 'hidden-source-map' : 'source-map',
        plugins: [
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': isProdEnv ? '"production"' : '"development"'
            }),
            new webpack.DllReferencePlugin({
                context: __dirname,
                /**
                 * 在这里引入 manifest 文件
                 */
                manifest: (function() {
                    var json = {};
                    try {
                        json = require('./client/dll/vendor-manifest.json');
                    } catch (e) {
                        console.log('[webpack.config.js] manifest not exist. please run "gulp webpackDll" to generate.');
                    }
                    return json;

                })()
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'app/commons',
                filename: 'app/commons.js',
                minChunks: Object.keys(entryMap).length
            }),
            isProdEnv ? new UglifyJsPlugin({
                parallel: true,
                cache: path.resolve(__dirname, './.tmp/jscache2'),
                uglifyOptions: {
                    compress: {
                        drop_console: true
                    }
                }
            }) : new webpack.HotModuleReplacementPlugin()
        ],
        output: {
            path: path.resolve(__dirname, './client/scripts-build'),
            filename: '[name].js',
            // Tells webpack to include comments in bundles with information about the contained modules
            pathinfo: isProdEnv ? false : true,
            publicPath: '/scripts-build/'
        }
    };
};

/**
 * [getEntrys 获取入口文件]
 * @return {Object} [入口名称及路径]
 */
function getEntrys() {
    var rootPath = './client/scripts/';
    var entry = {};
    var files = glob.sync('./client/scripts/**/*Main.js');

    files.forEach(function(item, index) {
        entry[item.substring(rootPath.length, item.lastIndexOf('.js'))] = item;
    });

    return entry;
}
