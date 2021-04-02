const { Pool } = require('pg');

const pool = new Pool({
  user: 'deandraper',
  host: 'localhost',
  database: 'spacework',
  port: 5432
});

module.exports = pool;

// pool.query(pgQuery, (err, result) => {
//   if (err) {
//     return console.error('Error executing query', err.stack)
//   }
//   console.log ('Success: ', result);
//   pool.end();
// });