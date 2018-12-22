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
const session = require('koa-session');

let config = require('./config');
let router = require('./routes');

let baseCtx = require('./middleware/BaseContext');

let sqlConnection = require('./database');

locale(app);

baseCtx(app);

// koa-session的坑必须在使用前为app.keys赋值
app.keys = ['newest secret key', 'older secret key'];

app.use(logger());
app.use(json());
app.use(bodyParser({
    multipart: true
}));

// 配置模板
app.use(views(config.template.path, config.template.options));
// 配置静态站点
app.use(staticServe(config.staticDir.root,config.staticDir.options));
// 配置i18n
app.use(i18n(app,config.i18n));
// 使用session
app.use(session(config.session,app));

app.use(async (ctx, next)=> {

    let n = ctx.session.views || 0;
    ctx.session.views = ++n;

    var date = new Date();
    ctx.state = Object.assign(ctx.state, {
        year: date.getFullYear(),
        month: ('00' + (date.getMonth() + 1)).substr(-2),
        date: ('00' + (date.getDate() + 1)).substr(-2),
        version:'1.0.0',
        pv: ctx.session.views
    });

    await next();
});

// 初始化数据库，如果不存在连接则创建表
app.use(async (ctx,next)=>{
    let promises = [];
    Object.values(sqlConnection).forEach(connetion=>{
        promises.push(connetion.sync());
    });
    await Promise.all(promises);
    await next();
});

// 装载路由
router(app);

app.listen(config.server.port, () => {
    console.log(`start on http://localhost:${config.server.port}`);
});

