/**
 * node ./server/server.js
 */

// 进入调试模式：

const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');
const staticServe = require('koa-static');
const logger = require('koa-logger');
const path = require('path');
const bodyParser = require('koa-body');

// 配置路由
let router = new Router();
router.get('/get-nocache', async(ctx)=>{
    // 去除多余的参数
    delete ctx.request.query['_'];
    ctx.body = ctx.request.query;
}).get('/get', async(ctx)=>{
    ctx.body = ctx.request.query;
}).post('/post', async(ctx) => {
    // 接受formdate提交的请求 || 接受json 字符串
    ctx.body = ctx.request.body.fields || ctx.request.body;
}).all('/get-header',async(ctx)=>{
    ctx.body = ctx.request.header;
}).get('/', async(ctx) => {
    ctx.redirect('/views/test.html');
});

// 静态资源目录对于相对入口文件server.js的路径
const staticPath = path.join(__dirname, '../client/');
// 装载路由
app.use(logger())
.use(bodyParser({
    multipart: true
}))
.use(router.routes())
.use(router.allowedMethods())
.use(staticServe(staticPath, {
    index: 'test.html'
}));

// 启动server并打开默认链接
app.listen(3000, () => {
    console.log('start on http://localhost:3000');
});

