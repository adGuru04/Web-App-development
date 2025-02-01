const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', '04122000ad', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports=sequelize;
//const mysql = require('mysql2');
//
//const pool = mysql.createPool({
//    host: 'localhost',
//    user:'root',
//    database:'node-complete',
//    password:'04122000ad'
//});
//
//module.exports = pool.promise();