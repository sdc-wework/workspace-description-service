const { Pool } = require('pg');

const pool = new Pool({
  user: 'deandraper',
  password: 'spacework1821',
<<<<<<< HEAD
  host: 'localhost',
=======
  host: 'postgres',
>>>>>>> 7c156fbcf34311052cead7ebbf01005c747fade7
  database: 'spacework',
  port: 5432
});

const pgQuery = "COPY workspacedescriptions(id, name, url, descriptionheadline, description, ownerId) FROM '" + __dirname + "/seedWorkspaces.csv' DELIMITER ',' CSV HEADER";

pool.query(pgQuery, (err, result) => {
  if (err) {
    return console.error('Error executing query', err.stack);
  }
  console.log ('Success: ', result);
  pool.end();
});