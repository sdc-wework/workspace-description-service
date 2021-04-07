const nr = require('newrelic');
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

app.get('/api/advanced/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(`SELECT
    wd.name AS workspace_name,
    wd.url AS workspace_url,
    wd.descriptionheadline AS workspace_description_headline,
    wd.description AS workspace_description,
    o.firstName || ' ' || o.lastName AS owner_full_name,
    p.url AS photo_url
    FROM workspacedescriptions AS wd
    INNER JOIN owners AS o
    ON wd.ownerId = o.id
    INNER JOIN photos AS p
    ON wd.id = p.workspaceId
    WHERE wd.id = ${id};`);
    res.json(result.rows);
  } catch(err) {
    console.error(err.message);
  }
});

app.get('/api/workspace-description/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(`SELECT * FROM workspacedescriptions WHERE id = ${id}`);
    res.json(result.rows);
  } catch(err) {
    console.error(err.message);
  }
});



app.post('api/workspace-description/', async (req, res) => {
  try {
    const result = await pool.query(`INSERT INTO workspacedescriptions(id,name,url,descriptionheadline,description,ownerId) VALUES($1,$2,$3,$4,$5,$6) RETURNING *`);
    res.json(result)
  } catch(err) {
    console.error(err.message);
  }
});

app.post('api/owner/', async (req, res) => {
  try {
    const result = await pool.query(`INSERT INTO owners(id,firstName,lastName) VALUES($1,$2,$3) RETURNING *`);
    res.json(result)
  } catch(err) {
    console.error(err.message);
  }
});

app.post('api/photo/', async (req, res) => {
  try {
    const result = await pool.query(`INSERT INTO owners(id,url,workspaceid) VALUES($1,$2,$3) RETURNING *`);
    res.json(result)
  } catch(err) {
    console.error(err.message);
  }
});

// app.post()

// app.post('api/workspace-description/', async (req, res) => {
//   try {
//     const result = await pool.query(``);
//     res.json(result)
//   } catch(err) {
//     console.error(err.message);
//   }
// });



const port = process.env.PORT || 6060;

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
})