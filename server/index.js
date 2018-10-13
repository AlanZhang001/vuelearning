/**
 * node ./server/server.js
 */

// 进入调试模式：

const Koa = require('koa');
const app = new Koa();

const staticServe = require('koa-static');
const logger = require('koa-logger');
const json = require('koa-json')
const bodyParser = require('koa-body');
const views = require('koa-views');

let config = require('./config');
let router = require('./routes');

let baseCtx = require('./middleware/BaseContext');

baseCtx(app);

app.use(logger())
.use(json())
.use(bodyParser({
    multipart: true
}))
.use(views(config.template.path, config.template.options))
.use(staticServe(config.staticDir.root,config.staticDir.options));

// 装载路由
router(app);

app.listen(config.server.port, () => {
    console.log(`start on http://localhost:${config.server.port}`);
});

