
let domain = 'http://cnbtspread.xyz';

// 使用地址：https://github.com/bda-research/node-crawler
// https://juejin.im/post/5943526fac502e006c71c242
let Crawler = require('crawler');
let pages = '1-1-0';

let ua = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36';
let referer = 'https://www.google.com.hk/';
let header = {
    Cookie:'__cfduid=dac7ee27bcbbcb19df1b9529e0f693c491539004318; cf_clearance=c9b940479c35834f182443b2cc120efdee04049c-1539089655-1800-150'
};

/**
 * 构造函数
 * @param {String} mname [电影名称]
 * @returns {undefined}
 */
function SpreadService(mname){
    this.name = encodeURIComponent(mname);
}

/**
 * [获取完整的资源信息]
 * @return {Array} [description]
 */
SpreadService.prototype.getRes = async function(){
    let docStr = await this.fetchDoc();
    let itemList = await this.fetchList(docStr);
    itemList = await this.fetchDownlaodPages(itemList);
    console.log(itemList);
    return itemList;
};

/**
 * 根据名称趴出html部分
 * @return {Promise}      [Promise]
 */
SpreadService.prototype.fetchDoc = async function() {
    let _name = this.name;
    return new Promise(function(resolve, reject) {
        let crawler = new Crawler({
            maxConnections: 10,
            rateLimit: 1000,
            userAgent:ua,
            referer:referer,
            headers:header,
            // This will be called for each crawled page
            callback: function(error, res, done) {
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
 * [fetchList 解析dom结构，拿到想要的数据]
 * @param  {String} doc [Document String]
 * @return {Array}     [数据列表]
 */
SpreadService.prototype.fetchList = function(doc) {
    var $ = doc.$;

    var arr = Array.from($('.list .dt'));
    console.log(arr.length);
    var res = [];
    arr.forEach(item=>{
        var $item = $(item);
        var $attr = $item.next('.attr').find('span').toArray();

        var href = $item.find('a').attr('href');
        var _name = $item.text().replace(/[\r\n\t]/gi,'');
        res.push({
            dl:'',
            name:_name,
            href:href,
            count: $($attr[2]).text().replace(/[\r\n\t]/gi,'').replace('个文件',''),
            size: $($attr[3]).text().replace(/[\r\n\t]/gi,'').replace('共',''),
            date:$($attr[4]).text().replace(/[\r\n\t]/gi,'').replace('收录','')
        });
    });
    return res;
};

/**
 * [fetchDownlaodLink description]
 * @param  {[type]} arr [description]
 * @return {[type]}     [description]
 */
SpreadService.prototype.fetchDownlaodPages = async function(arr){

    if(!Array.isArray(arr) || arr.length === 0) {
        return [];
    }

    var promises = [];
    var that = this;
    arr.forEach(item=>{
        var p = new Promise(function(resolve, reject) {
            let crawler = new Crawler({
                maxConnections: 10,
                rateLimit: 1000,
                userAgent:ua,
                referer:referer,
                headers:header,
                callback: function(error, res, done) {
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

SpreadService.prototype.fetchDownlaodLinks = function(item){
    var $ = item.$;
    var str = $('.dd.magnet').find('a').attr('href');
    return str;
};

module.exports = SpreadService;
