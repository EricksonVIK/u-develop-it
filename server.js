// import express
const express = require ('express');
// add designation port
const PORT = process.env.PORT || 3001;
const app = express();

// mysql import
const mysql= require ('mysql2');

// express middleware
app.use(express.urlencoded({extended:false}));
app.use(express.json());

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


// test express
app.get('/', (req, res) => {
    res.json({
      message: 'Hello World'
    });
  });

  // query test to verify mysql connection -- creates array of objects
  // each row is an individual object
  // changed to query a single candidate
  db.query(`SELECT * FROM candidates WHERE id = 1`, (err, row) => {
    // console.log(rows);
    if (err) {
      console.log(err);
    }
    console.log(row);
  });

  // query to create a candidate
  const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected) 
              VALUES (?,?,?,?)`;
const params = [1, 'Ronald', 'Firbank', 1];

db.query(sql, params, (err, result) => {
  if (err) {
    console.log(err);
  }
  console.log(result);
});

  // query to delet a candidate
  db.query(`DELETE FROM candidates WHERE id = ?`, 1, (err, result) => {
    if (err) {
      console.log (err);
    }
    console.log(result);
  });

// Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
  });


// Start Express.js Server on port 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});