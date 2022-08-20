// import express
const express = require ('express');
// add designation port
const PORT = process.env.PORT || 3001;
const app = express();
// input check import
const inputCheck = require('./utils/inputCheck');
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


// Get all candidates
app.get('/api/candidates', (req, res) => {
  const sql = `SELECT * FROM candidates`;

  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: rows
    });
  });
});

// query test to verify mysql connection -- creates array of objects
// each row is an individual object
// changed to query a single candidate
      // db.query(`SELECT * FROM candidates WHERE id = 1`, (err, row) => {
      //   // console.log(rows);
      //   if (err) {
      //     console.log(err);
      //   }
      //   console.log(row);
      // });
// Get a single candidate
app.get('/api/candidate/:id', (req, res) => {
  const sql = `SELECT * FROM candidates WHERE id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: row
    });
  });
});

// query to delet a candidate
// db.query(`DELETE FROM candidates WHERE id = ?`, 1, (err, result) => {
//   if (err) {
//     console.log (err);
//   }
//   console.log(result);
// });
// Delete a candidate - updated with app.get
app.delete('/api/candidate/:id', (req, res) => {
  const sql = `DELETE FROM candidates WHERE id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.statusMessage(400).json({ error: res.message });
    } else if (!result.affectedRows) {
      res.json({
        message: 'Candidate not found'
      });
    } else {
      res.json({
        message: 'deleted',
        changes: result.affectedRows,
        id: req.params.id
      });
    }
  });
});

// Create a candidate
app.post('/api/candidate', ({ body }, res) => {
  const errors = inputCheck(
    body,
    'first_name',
    'last_name',
    'industry_connected'
  );
  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }

  const sql = `INSERT INTO candidates (first_name, last_name, industry_connected)
    VALUES (?,?,?)`;
  const params = [body.first_name, body.last_name, body.industry_connected];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: body
    });
  });
});


// Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
  });


// Start Express.js Server on port 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});