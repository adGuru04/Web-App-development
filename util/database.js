const Sequelize = require('sequelize'); // 🛢️ Import Sequelize ORM

// 🔗 Create a new Sequelize instance (Database connection)
const sequelize = new Sequelize('node-complete', 'root', '04122000ad', {
    dialect: 'mysql', // 🗄️ Specify database dialect (MySQL)
    host: 'localhost' // 🏠 Database host (Local machine)
});

module.exports = sequelize; // 📤 Export the database connection



//----------------------------------------------------------------------------------------
// 📝 Below is the old raw MySQL-based connection (Commented Out)
/*
const mysql = require('mysql2'); // 🛢️ Import MySQL2 package

// 🔗 Create a MySQL connection pool
const pool = mysql.createPool({
    host: 'localhost', // 🏠 Database host
    user: 'root', // 👤 Database username
    database: 'node-complete', // 🛢️ Database name
    password: '04122000ad' // 🔑 Database password
});

module.exports = pool.promise(); // 📤 Export the MySQL connection (Promisified)
*/
