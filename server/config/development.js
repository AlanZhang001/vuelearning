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
    },
    spiderConfig: {
        // 站点的爬虫设置
        spread: {
            domain: 'http://cnbtspread.xyz',
            // ua: 'Mozilla/5.0 (Linux;u;Android 4.2.2;zh-cn;) AppleWebKit/534.46 (KHTML,likeGecko) Version/5.1 Mobile Safari/10600.6.3 (compatible; Baiduspider/2.0;+http://www.baidu.com/search/spider.html)',
            // ua: 'Mozilla/5.0 (compatible; YandexBot/3.0; +http://yandex.com/bots)',
            ua: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36',
            referer: 'http://yandex.com/',
            header: {
                Cookie: '__cfduid=dfbda475b5fc05d43e42873aa445339d81539510952; cf_clearance=79128b706dde27559bd6d6eaba5d0693e4fb93dc-1539511139-1800-250'
            },
            rateLimit: 2100
        }
    },
    mysql: {
        spread: {
            'host': '127.0.0.1',
            'port': 3306,
            'user': 'root',
            'password': '46614162aq',
            'dialect': 'mysql',
            'db': 'spread',
            'logging': false,
            pool: {
                max: 5,
                min: 0,
                idle: 10000
            }
        }
    }
};

module.exports = config;
