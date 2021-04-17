const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  password: 'spacework1821',
  host: '18.190.158.40',
  database: 'spacework',
  port: 5432
});

const pgQuery = "COPY owners(id, firstName, lastName) FROM '" + __dirname + "/seedOwners.csv' DELIMITER ',' CSV HEADER";

pool.query(pgQuery, (err, result) => {
  if (err) {
    return console.error('Error executing query', err.stack);
  }
  console.log ('Success: ', result);
  pool.end();
});