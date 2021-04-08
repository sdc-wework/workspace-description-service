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



app.post('/api/workspace-description', async (req, res) => {
  try {
    const { id, name, url, descriptionheadline, description, ownerId } = req.body;
    const result = await pool.query(`INSERT INTO workspacedescriptions(id,name,url,descriptionheadline,description,ownerId) VALUES($1,$2,$3,$4,$5,$6) RETURNING *`, [id, name, url, descriptionheadline, description, ownerId]);
    res.json(result);
  } catch(err) {
    console.error(err.message);
  }
});

app.post('/api/owner', async (req, res) => {
  try {
    const { id, firstName, lastName } = req.body;
    const result = await pool.query(`INSERT INTO owners(id,firstName,lastName) VALUES($1,$2,$3) RETURNING *`, [id, firstName, lastName]);
    res.json(result);
  } catch(err) {
    console.error(err.message);
  }
});

app.post('/api/photo/', async (req, res) => {
  try {
    let { id, url, workspaceid } = req.body;
    const result = await pool.query(`INSERT INTO photos(id,url,workspaceid) VALUES($1,$2,$3) RETURNING *`, [id, url, workspaceid]);
    res.json(result);
  } catch(err) {
    console.error(err.message);
  }
});

app.put('/api/workspace-description/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, url, descriptionheadline, description, ownerId } = req.body;
    const result = await pool.query(`UPDATE workspacedescriptions SET name = $2, url = $3, descriptionheadline = $4, description = $5, ownerid = $6 WHERE id = $1`, [id, name, url, descriptionheadline, description, ownerId]);
    res.json(result);
  } catch(err) {
    console.error(err.message);
  }
});

app.delete('api/workspace-description/:id', async (req, res) => {
  try{
    const { id } = req.params;
    const result = await pool.query(`DELETE FROM workspacedescriptions WHERE id = $1`, [id]);
    res.json(result);
  } catch(err) {
    console.error(err.message);
  }
})

// UPDATE workspacedescriptions
// SET name='Undying Teenage Love',
// url='undying-teenage-love',
// descriptionheadline='libero iure ducimus',
// description='sequi sunt nisi maiores maiores corrupti quia eos non impedit est velit ab nobis culpa voluptatem suscipit voluptate enim possimus quod blanditiis facere earum nostrum ea ut nesciunt sequi quae deleniti consequatur quia vitae et',
// ownerid=1
// WHERE id=1;

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