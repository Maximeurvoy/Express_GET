const mysql = require('mysql');

// Setup database connection
const connection = mysql.createConnection({
  host: 'localhost', // db server address
  user: 'root', // db user's name
  password: '', // db user's password
  database: 'company', // db name
});

module.exports = connection;
