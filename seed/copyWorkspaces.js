const { Pool } = require('pg');

const pool = new Pool({
  user: 'deandraper',
  host: 'localhost',
  database: 'spacework',
  port: 5432
});

const pgQuery = "COPY workspacedescriptions(id, name, url, descriptionheadline, description, ownerId) FROM '/Users/deandraper/hr/sdc/pgseed/seedWorkspaces.csv' DELIMITER ',' CSV HEADER";

pool.query(pgQuery, (err, result) => {
  if (err) {
    return console.error('Error executing query', err.stack);
  }
  console.log ('Success: ', result);
  pool.end();
});