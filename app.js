const express = require('express')
var cors = require('cors')
const mysql = require('mysql2/promise');
const app = express()
const port = 3001

app.use(cors())
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/api/user', async (req, res) => {
    // Get the client
    // Create the connection to database
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      database: 'newb',
      password: 'Bombe656..'
    });
    
    // A simple SELECT query
    const [results] = await connection.query(
    'SELECT * FROM `User`'
    );

  res.send(results);
})

app.delete('/api/user/:userId/delete', async (req, res) => {
  const userId = req.params.userId;

  // Get the client
  // Create the connection to database
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'newb',
    password: 'Bombe656..'
  });
  
  const [results] = await connection.execute(
    'delete from user where id = ?',
  [userId]
  );

  res.send(results.affectedRows > 0);
})

app.post('/api/user/create', async (req, res) => {
  // Get the client
  // Create the connection to database
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'newb',
    password: 'Bombe656..'
  });

  const body = req.body;
  
  const [results] = await connection.execute(
    'insert into user (first_name, last_name, email) values (?, ?, ?)',
      [body['firstName'], body['lastName'], body['email']]
  );

  const anyAffectedRows = results.affectedRows > 0
  if (anyAffectedRows) {
    const user = await connection.query(`select * from User where id = ?`, [results.insertId])
    res.send({
      status: 'success',
      message: 'Bruker lagt til.',
      user: user[0][0]
    });
  } else {
    res.send({
      status: 'error',
      message: 'Ingen bruker lagt til av en eller annen grunn.'
    });
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
