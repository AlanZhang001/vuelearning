var render = require('./render.js');
var api = require('./api.js');

module.exports = (app) =>{
    app.use(api.routes());
    app.use(render.routes())
       .use(render.allowedMethods());
};
