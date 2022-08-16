// import express
const express = require ('express');
// add designation port
const PORT = process.env.PORT || 3001;
const app = express();

// express middleware
app.use(express.urlencoded({extended:false}));
app.use(express.json());


// test express
app.get('/', (req, res) => {
    res.json({
      message: 'Hello World'
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