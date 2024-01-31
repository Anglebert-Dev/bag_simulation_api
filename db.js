// connecting to database
// it's good to use .env but to make it simple for you to run it on your computer i didn't use it to hide my passwords and username
// db.js
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'dearmama',
  database: 'bag_simulation_db',
});

// Check if the connection is successful
pool.getConnection()
  .then(connection => {
    console.log('Connected to MySQL database');
    connection.release();
  })
  .catch(error => {
    console.error('Error connecting to MySQL database:', error.message);
  });

module.exports = pool;

 