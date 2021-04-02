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
  console.log('get FIRED')
  // try {
  //   const { id } = req.params;
  //   // const getWS = await pool.query("SELECT wd.name AS workspace_name, wd.url AS workspace_url, wd.descriptionheadline AS workspace_description_headline, wd.description AS workspace_description, o.firstName || ' ' || o.lastName AS owner_full_name, p.url AS photo_url FROM workspacedescriptions AS wd LEFT JOIN owners AS o ON wd.ownerId = o.id LEFT JOIN photos AS p ON wd.id = p.workspaceId WHERE wd.id = $1;", id);

  //   const getWS = await pool.query("SELECT * FROM workspacedescriptions;");

  //   console.log(getWS.rows, getWS);
  //   res.json(getWS.rows);
  // } catch(err) {
  //   console.error('Error executing query: ', err.message);
  // }

  let result = await pool.query("SELECT * FROM workspacedescriptions WHERE id = 2943643;", (err, result) => {
    if (err) {
      return console.error('Error executing query', err.stack)
    }
    console.log ('Success: ', result);
  });
  res.json(result);
});

const port = process.env.PORT || 3003;

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
})