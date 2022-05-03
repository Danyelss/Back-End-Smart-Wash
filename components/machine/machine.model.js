const Sequelize = require('sequelize');
const db = require('../../config/db');

module.exports = db.define('machine', {
    id: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    program: Sequelize.STRING,
    timer: Sequelize.STRING,
}, { paranoid: true });