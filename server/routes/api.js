let SpreadController = require('./../controllers/SpreadController');

const Router = require('koa-router');
// 配置路由
let router = new Router();

router.prefix('/api');

router.get('/getdoc/:name',SpreadController.getDoc);

module.exports = router;
