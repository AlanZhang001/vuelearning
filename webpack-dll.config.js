var webpack = require('webpack');
var ManifestPlugin = require('webpack-manifest-plugin');
var path = require('path');

module.exports = {
    entry: {
        vendor: ['vue/dist/vue', 'vue-router']
    },
    output: {
        path: path.join(__dirname,'./client/scripts/dll'),
        filename: '[name].js',
        /**
         * output.library
         * 将会定义为 window.${output.library}
         * 在这次的例子中，将会定义为`window.vendor_library`
         */
        library: 'DLL_UVE_[name]'
    },
    plugins: [
        new webpack.DllPlugin({
            /**
             * path
             * 定义 manifest 文件生成的位置
             * [name]的部分由entry的名字替换
             */
            path: './client/scripts/dll/[name]-manifest.json',
            /**
             * name
             * dll bundle 输出到那个全局变量上
             * 和 output.library 一样即可。
             */
            name: 'DLL_UVE_[name]',
            context: __dirname
        }),
        new ManifestPlugin()
    ]
};
