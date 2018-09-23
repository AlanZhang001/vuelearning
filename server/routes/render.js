/**
 * 页面render
 */

let SiteController = require('./../controllers/SiteController');
const Router = require('koa-router');
// 配置路由
let router = new Router();

router.get('/',SiteController.test);

router.get('/test/*',SiteController.test);


module.exports = router;
