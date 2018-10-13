let mysqlConfig = require('../config').mysql;
let Sequelize = require('sequelize');
let spreadConfig = mysqlConfig.spread;

module.exports = {
    spread: new Sequelize(spreadConfig.db, spreadConfig.user, spreadConfig.password, {
        host: spreadConfig.host,
        port: spreadConfig.port,
        dialect: spreadConfig.dialect,
        pool: spreadConfig.pool,
        logging: spreadConfig.logging
    })
};
