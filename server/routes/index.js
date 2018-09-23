var render = require('./render.js');

module.exports = (app) =>{
    app.use(render.routes())
       .use(render.allowedMethods());
};
