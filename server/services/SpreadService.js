let SpreadService = module.exports;
let domain = 'http://cnbtspread.xyz';

// 使用地址：https://github.com/bda-research/node-crawler
// https://juejin.im/post/5943526fac502e006c71c242
let Crawler = require('crawler');
let pages = '1-0-0';

/**
 * 根据名称趴出html部分
 * @param  {String} name [关键词名称]
 * @return {Promise}      [Promise]
 */
SpreadService.fetchDoc = async function(name) {
    return new Promise(function(resolve, reject) {
        let crawler = new Crawler({
            maxConnections: 10,
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
		name = encodeURIComponent(name);
        crawler.queue(`${domain}/${name}/${pages}`);
    });

};

/**
 * [fetchList 解析dom结构，拿到想要的数据]
 * @param  {String} doc [Document String]
 * @return {Array}     [数据列表]
 */
SpreadService.fetchList = function(doc) {
    var $ = doc.$;

    var arr = Array.from($('.list .dt.p1'));
    var res = [];
    arr.forEach(item=>{
        res.push($(item).text().replace(/[\r\n\t]/gi,''));
    });
    return res;
};
