// mysql import
const mysql= require ('mysql2');

// connect app to MySQL
const db = mysql.createConnection(
    {
      host: 'localhost',
      // Your MySQL username,
      user: 'root',
      // Your MySQL password
      // ran ALTER USER root@localhost IDENTIFIED BY ''; to ammend password to empty
      password: '',
      database: 'election'
    },
    console.log('Connected to the election database.')
  );

module.exports = db;