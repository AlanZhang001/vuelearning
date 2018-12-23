
// 使用地址：https://github.com/bda-research/node-crawler
// https://juejin.im/post/5943526fac502e006c71c242
let Crawler = require('crawler');
let spreadConfig = require('./../config').spiderConfig;
let Spread = require('./../models/Spread');
var schedule = require('node-schedule');

/**
 * 构造函数
 * @returns {undefined}
 */
function SpreadService() {
    this.site = 'spread';
    this.spreadConfig = spreadConfig[this.site];
}

SpreadService.prototype.getParam = function(pageIndex){
    // pages-order-type
    return `${pageIndex}-1-2`;
};

/**
 * [获取完整的资源信息]
 * @param {String} mname [电影名称]
 * @return {Array} [description]
 */
SpreadService.prototype.getRes = async function (mname) {

    // 通过爬虫去获取数据
    let itemList = await this.getResOnline(mname);

    if (Array.isArray(itemList) && itemList.length > 0) {
        return {
            list: itemList,
            sourceSite: this.spreadConfig.domain,
            isFromCache: false
        };
    }

    let cacheList = await this.findFromDBByName(mname);

    // 读取数据库中的数据
    return {
        list: cacheList,
        sourceSite: '本地数据',
        isFromCache: true
    };
};

/**
 * [从主动的站点获取获取完整的资源信息]
 * @param {String} mname [电影名称]
 * @return {Array} [description]
 */
SpreadService.prototype.getResOnline = async function(mname){
    // 通过爬虫去获取数据
    let docStr = await this.fetchDoc(mname);
    let itemList = await this.fetchList(docStr);

    itemList = await this.fetchDownlaodPages(itemList);

    if (Array.isArray(itemList) && itemList.length > 0) {
        // 将获取的数据同步至数据库
        let result = await this.syncDB(itemList);
        result && console.log('---------syncDB success------------');
    }
    return itemList;
};

/**
 * 根据名称趴出html部分
 * @param {String} _name [movie name]
 * @return {Promise} [Promise]
 */
SpreadService.prototype.fetchDoc = async function (_name,pageIndex = 1) {
    return new Promise((resolve, reject) => {
        let crawler = new Crawler(
            Object.assign({
                callback: function (error, res, done) {
                    done();
                    if (error) {
                        console.log('------------fetchDoc-------------');
                        console.log(error);
                        resolve(null);
                    } else {
                        resolve(res);
                    }
                }
            }, this.spreadConfig));
        crawler.queue(`${this.spreadConfig.domain}/${ encodeURIComponent(_name)}/${this.getParam(pageIndex)}`);
    });
};

/**
 * [fetchList 解析dom结构，拿到想要的列表数据]
 * @param  {String} doc [Document String]
 * @return {Array}     [数据列表]
 */
SpreadService.prototype.fetchList = function (doc) {
    if(!doc) {
        return [];
    }

    var $ = doc.$;
    var arr = Array.from($('.list .dt'));
    var res = [];

    arr.forEach(item => {
        var $item = $(item);
        var $attr = $item.next('.attr').find('span').toArray();

        var href = $item.find('a').attr('href');
        var _name = $item.text().replace(/[\r\n\t]/gi, '');
        res.push({
            dl: '',
            name: _name,
            link: this.spreadConfig.domain + href,
            count: $($attr[2]).text().replace(/[\r\n\t]/gi, '').replace('个文件', ''),
            size: $($attr[3]).text().replace(/[\r\n\t]/gi, '').replace('共', ''),
            record_date: new Date($($attr[4]).text().replace(/[\r\n\t]/gi, '').replace('收录', ''))
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
        var p = new Promise((resolve, reject) => {
            let crawler = new Crawler(Object.assign({
                callback: function (error, res, done) {
                    if (error) {
                        console.log(error);
                        resolve(null);
                    } else {
                        item.dl = that.fetchDownlaodLinks(res);
                        resolve(item);
                    }
                    done();
                }
            }, this.spreadConfig));
            crawler.queue(/^http/gi.test(item.link) ? item.link : ('http:' + item.link));
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

/**
 * 将得到的列表在数据库中同步
 * @param {Array} list [数据列表]
 * @returns {Boolean} 结果
 */
SpreadService.prototype.syncDB = async function (list) {
    if (!Array.isArray(list)) {
        return true;
    }

    // 在本地数据库中查找，如果没有记录，则插入，如果有，则更新
    for (var i = 0, length = list.length; i < length; i++) {

        var item = list[i];
        if (!item.dl) {
            continue;
        }
        await Spread.upsert(item, {
            validate: true,
            hooks: true
        });
    }
    return true;
};

/**
 * 根据名称从数据库查询数据
 * @param {String} name [影片名称]
 * @param {Boolean} isLike [是否模糊查找]
 * @return {Array} 结果列表
 */
SpreadService.prototype.findFromDBByName = async function (name, isLike = true) {
    let result = Spread.findAll({
        where: {
            name: isLike ? {
                $like: '%' + name + '%'
            } : name
        },
        // attributes: ['name']
    });
    return result || [];
};

SpreadService.prototype.fetchBatch = async function(nameList){
    let baseTag = nameList || spreadConfig.tagList;
    let res = [];
    baseTag.forEach(async tag=>{
        let resList = await this.getResOnline(tag);
        if(Array.isArray(resList) && resList.length > 0){
            res = res.concat(resList);
        }
    });
    return res;
};

module.exports = SpreadService;
