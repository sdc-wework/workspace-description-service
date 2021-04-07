const express = require('express');
const path = require('path');
const cors = require('cors');
const pool = require('../database/db.js');

console.log(pool)

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('/', (req, res) => {
  res.send('Everything is connected!');
});

app.get('/api/workspace-description/', async (req, res) => {
  let result = await pool.query("SELECT * FROM workspacedescriptions WHERE id = 2943643;", (err, result) => {
    if (err) {
      return console.error('Error executing query', err.stack)
    }
    console.log ('Success: ', result);
  });
  res.json(result);
});

const port = process.env.PORT || 6060;

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
})