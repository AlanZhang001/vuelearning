
// 使用地址：https://github.com/bda-research/node-crawler
// https://juejin.im/post/5943526fac502e006c71c242
let Crawler = require('crawler');
let spreadConfig = require('./../config').spiderConfig.spread;
let Spread = require('./../models/Spread');
let { domain, ua, referer, header,rateLimit } = spreadConfig;

let pages = '1-1-0';

/**
 * 构造函数
 * @param {String} mname [电影名称]
 * @returns {undefined}
 */
function SpreadService(mname) {
    this.name = encodeURIComponent(mname);
}

/**
 * [获取完整的资源信息]
 * @return {Array} [description]
 */
SpreadService.prototype.getRes = async function () {
    let cacheList = this.findFromDBByName(this.name);

    // 读取数据库中的数据
    if (Array.isArray(cacheList) && cacheList.length > 0) {
        return cacheList;
    }

    // 通过爬虫去获取数据
    let docStr = await this.fetchDoc();
    let itemList = await this.fetchList(docStr);

    if (!itemList || itemList.length === 0) {
        console.log(docStr);
    }

    itemList = await this.fetchDownlaodPages(itemList);

    // 将获取的数据同步至数据库
    await this.syncDB(itemList);

    return itemList;
};

SpreadService.prototype.syncDB = async function (list) {
    if (!Array.isArray(list)) {
        return true;
    }
};


SpreadService.prototype.findFromDBByName = async function (name) {
    let result = Spread.findAll({
        where: {
            name: {
                $like: '%' + name + '%'
            }
        },
        attributes: ['name']
    });
    return result || [];
};

/**
 * 根据名称趴出html部分
 * @return {Promise}      [Promise]
 */
SpreadService.prototype.fetchDoc = async function () {
    let _name = this.name;
    return new Promise(function (resolve, reject) {
        let crawler = new Crawler({
            rateLimit: rateLimit,
            userAgent: ua,
            referer: referer,
            headers: header,
            // This will be called for each crawled page
            callback: function (error, res, done) {
                if (error) {
                    reject(error);
                } else {
                    resolve(res);
                }
                done();
            }
        });

        crawler.queue(`${domain}/${_name}/${pages}`);
    });
};

/**
 * [fetchList 解析dom结构，拿到想要的列表数据]
 * @param  {String} doc [Document String]
 * @return {Array}     [数据列表]
 */
SpreadService.prototype.fetchList = function (doc) {
    var $ = doc.$;

    var arr = Array.from($('.list .dt'));
    console.log(arr.length);
    var res = [];
    arr.forEach(item => {
        var $item = $(item);
        var $attr = $item.next('.attr').find('span').toArray();

        var href = $item.find('a').attr('href');
        var _name = $item.text().replace(/[\r\n\t]/gi, '');
        res.push({
            dl: '',
            name: _name,
            href: href,
            count: $($attr[2]).text().replace(/[\r\n\t]/gi, '').replace('个文件', ''),
            size: $($attr[3]).text().replace(/[\r\n\t]/gi, '').replace('共', ''),
            date: $($attr[4]).text().replace(/[\r\n\t]/gi, '').replace('收录', '')
        });
    });
    return res;
};

/**
 * [fetchDownlaodLink 获取影片的介绍链接爬取下载页面的下载链接]
 * @param  {Array} arr [fetchList返回的结果]
 * @return {Promise}     [Promise]
 */
SpreadService.prototype.fetchDownlaodPages = async function (arr) {

    if (!Array.isArray(arr) || arr.length === 0) {
        return [];
    }

    var promises = [];
    var that = this;
    arr.forEach(item => {
        var p = new Promise(function (resolve, reject) {
            let crawler = new Crawler({
                rateLimit: rateLimit,
                userAgent: ua,
                referer: referer,
                headers: header,
                callback: function (error, res, done) {
                    if (error) {
                        reject(error);
                    } else {
                        var link = that.fetchDownlaodLinks(res);
                        item.dl = link;
                        resolve(item);
                    }
                    done();
                }
            });
            crawler.queue(/^http/gi.test(item.href) ? item.href : ('http:' + item.href));
        });
        promises.push(p);
    });
    return Promise.all(promises);
};

/**
 * fetchDownlaodLinks：解析下载页的dom节点获取下载链接
 * @param {Object} item [Crawler获取的doc]
 * @returns {String} [下载链接]
 */
SpreadService.prototype.fetchDownlaodLinks = function (item) {
    var $ = item.$;
    var str = $('.dd.magnet').find('a').attr('href');
    return str;
};

module.exports = SpreadService;
