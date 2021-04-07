const { Pool } = require('pg');
const { host, user, database, port } = require('./config');

// Create a pool instance and pass in our config, which we set in our env vars
const pool = new Pool({
    host,
    user,
    database,
    port,
});

module.exports = pool;