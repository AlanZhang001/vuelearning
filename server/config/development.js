const path = require('path');

let config = {
    // 启动端口
    server: {
        port: 4000
    },
    // 渲染模板的配置
    template: {
        path: path.join(__dirname, './../views'),
        options: {
            map: {
                html: 'ejs'
            }
        }
    },
    // koa-static 的配置
    staticDir: {
        root: path.join(__dirname, '../../client/'),
        options: {
            maxage: 1000 * 30 * 24 * 3600,
            gzip: true
        }
    }
};

module.exports = config;
