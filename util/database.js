const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'node_digital',
    password: ''
});

module.exports = pool.promise();