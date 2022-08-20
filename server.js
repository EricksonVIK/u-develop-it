// import express
const express = require ('express');
// input api routes
const apiRoutes = require('./routes/apiRoutes');

// add designation port
const PORT = process.env.PORT || 3001;
const app = express();
// input check import
const inputCheck = require('./utils/inputCheck');

// adding connections\
const db = require('./db/connections');
// express middleware
app.use(express.urlencoded({extended:false}));
app.use(express.json());

// Add after Express middleware
app.use('/api', apiRoutes);


// Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
  });


// Start Express.js Server on port 3001
db.connect(err => {
  if (err) throw err;
  console.log('Database connected.')
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});