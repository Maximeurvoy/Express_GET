const express = require('express');
const mysql = require('mysql');

const connection = require('./conf');

const app = express();
const port = 3000;

app.get('/api/movie/:id', (req, res) => {
  connection.query(`SELECT * FROM movie WHERE id = ${mysql.escape(req.params.id)}`, (err, results) => {
    if (err) {
      res.status(500).send(`ben ça marche po :${err.message}`);
    } else if (results.length <= 0) {
      res.status(404).send(`Movie not found`);
    } else {
      res.send(results);
    }
  });
});
 
// respond to requests on `/api/employees`
app.get('/api/movie', (req, res) => {
  let sql = 'SELECT * FROM movie';
  const sqlValues = [];
  if (req.query.rating) {
    sql += ' WHERE rating = ?';
    sqlValues.push(req.query.rating);
  }
  if (req.query.genre) {
    sql += ' WHERE genre = ?';
    sqlValues.push(req.query.genre);
  }
  // send an SQL query to get all employees
  connection.query(sql, sqlValues, (err, results) => {
    if (err) {
      // If an error has occurred, then the client is informed of the error
      res.status(500).send(`An error occurred: ${err.message}`);
    } else {
      // If everything went well, we send the result of the SQL query as JSON
      res.json(results);
    }
  });
});

app.listen(port, (err) => {
  if (err) {
    throw new Error('Something bad happened...');
  }

  console.log(`Server is listening on ${port}`);
});
