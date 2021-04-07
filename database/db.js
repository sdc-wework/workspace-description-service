const { Pool } = require('pg');

const pool = new Pool({
  user: 'deandraper',
  host: 'localhost',
  database: 'spacework',
  port: 5432
});

module.exports = pool;