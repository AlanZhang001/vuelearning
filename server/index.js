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

const locale = require('koa-locale');
const i18n = require('koa-i18n');

let config = require('./config');
let router = require('./routes');

let baseCtx = require('./middleware/BaseContext');

locale(app);

baseCtx(app);

app.use(logger());
app.use(json());
app.use(bodyParser({
    multipart: true
}));
app.use(views(config.template.path, config.template.options));
app.use(staticServe(config.staticDir.root,config.staticDir.options));
app.use(i18n(app,config.i18n));

app.use(async function(ctx, next) {
    var date = new Date();
    ctx.state = Object.assign(ctx.state, {
        year: date.getFullYear(),
        month: ('00' + (date.getMonth() + 1)).substr(-2),
        date: ('00' + (date.getDate() + 1)).substr(-2),
        version:'1.0.0'
    });
    await next();
});

// 装载路由
router(app);

app.listen(config.server.port, () => {
    console.log(`start on http://localhost:${config.server.port}`);
});

