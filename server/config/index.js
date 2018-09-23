let nconf = require('nconf');
nconf.argv().env();
let app_env = nconf.get('NODE_ENV');

if (app_env === undefined || app_env === '') {
    app_env = 'development';
}

// 根据环境的不同使用不同的配置环境
module.exports = require('./' + app_env);

module.exports.isDevEnv = app_env === 'production' ? 0 : 1;
