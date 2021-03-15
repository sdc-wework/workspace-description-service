const { Pool } = require('pg');

const pool = new Pool({
    user: 'deandraper',
    host: 'localhost',
    port: 5432,
    database: 'spacework'
})

module.exports = pool;