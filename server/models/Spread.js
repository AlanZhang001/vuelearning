let Sequelize = require('sequelize');
let spread = require('../database').spread;

module.exports = spread.define('movie_search', {
    id: {
        comment: 'id',
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'id'
    },
    name: {
        comment: '电影名称',
        type: Sequelize.STRING,
        allowNull: false,
        field: 'name'
    },
    link: {
        comment: '电影介绍的路径',
        allowNull: false,
        type: Sequelize.STRING,
        field: 'link'
    },
    dl: {
        comment: '电影的magnet下载路径',
        allowNull: false,
        type: Sequelize.STRING,
        field: 'dl'
    },
    created: {
        comment: '创建时间',
        allowNull: false,
        type: Sequelize.DATE,
        field: 'createatd'
    },
    updated: {
        comment: '更新时间',
        allowNull: false,
        type: Sequelize.DATE,
        field: 'updatedat'
    },
    size: {
        comment: '大小',
        allowNull: true,
        type: Sequelize.String,
        field: 'size'
    },
    count: {
        comment: '资源内文件个数',
        allowNull: true,
        type: Sequelize.INTEGER,
        field: 'count'
    },
    recordDate: {
        comment: '收录日期',
        allowNull: true,
        type: Sequelize.DATE,
        field: 'record_date'
    }
}, {
    underscored: true,
    freezeTableName: true
});