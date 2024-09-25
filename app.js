const express = require('express')
var cors = require('cors')
const mysql = require('mysql2/promise');
const app = express()
const port = 3000

app.use(cors())

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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})