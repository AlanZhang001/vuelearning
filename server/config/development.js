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
            ua: 'Mozilla/5.0 (Linux;u;Android 4.2.2;zh-cn;) AppleWebKit/534.46 (KHTML,likeGecko) Version/5.1 Mobile Safari/10600.6.3 (compatible; Baiduspider/2.0;+http://www.baidu.com/search/spider.html)',
            referer: 'https://www.google.com.hk/',
            header: {
                Cookie: '__cfduid=dac7ee27bcbbcb19df1b9529e0f693c491539004318; cf_clearance=c9b940479c35834f182443b2cc120efdee04049c-1539089655-1800-150'
            }
        }
    },
    mysql: {
        spred: {
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
