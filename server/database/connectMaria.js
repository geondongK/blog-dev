const mariadb = require('mariadb');
require('dotenv').config();

const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_NAME,
    connectionLimit: 5,
});

// Connect and check for errors
pool.getConnection((error, connection) => {
    if (error) {
        console.log(error);
    } else {
        console.log('mariaDB Connected.');
    }
});

module.exports = pool;
