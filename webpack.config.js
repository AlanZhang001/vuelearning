/*global module*/
const webpack = require('webpack');
const path = require('path');
const glob = require('glob');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
var entryMap = getEntrys();

module.exports = env => {
    var isProdEnv = env && env.prod;

    return {
        entry: entryMap,
        resolve: {
            modules: [
                './todolist/scripts',
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
        devtool: isProdEnv ? 'hidden-source-map' : 'source-map',
        plugins: isProdEnv ?
            [new UglifyJsPlugin({
                parallel: true,
                cache: path.resolve(__dirname, './.tmp/jscache2'),
                uglifyOptions: {
                    compress: {
                        drop_console: true
                    }
                }
            })]:
            undefined
        ,
        output: {
            path: path.resolve(__dirname, './todolist/scripts/dist'),
            filename: '[name].js',
            // Tells webpack to include comments in bundles with information about the contained modules
            pathinfo: isProdEnv ? false : true
        }
    };
};

/**
 * [getEntrys 获取入口文件]
 * @return {Object} [入口名称及路径]
 */
function getEntrys() {
    var rootPath = './todolist/scripts/source/';
    var entry = {};
    var files = glob.sync('./todolist/scripts/source/**/*Main.js');

    files.forEach(function(item, index) {
        entry[item.substring(rootPath.length, item.lastIndexOf('.js'))] = item;
    });

    return entry;
}
