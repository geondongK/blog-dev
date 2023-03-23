const mariadb = require('mariadb');
const dotenv = require('dotenv');
const path = require('path');

if (process.env.NODE_ENV === 'production') {
    dotenv.config({ path: path.join(__dirname, '../.env.production') });
} else if (process.env.NODE_ENV === 'development') {
    dotenv.config({ path: path.join(__dirname, '../.env.development') });
} else {
    dotenv.config(); // for .env
}

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
