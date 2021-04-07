const { company } = require('faker');
const db = require('./db');

const query = "COPY workspacedescriptions FROM '/Users/deandraper/hr/sdc/pgseed/output.csv' DELIMITER ',' CSV HEADER";

const copy = async () => {
  await db.query(query);
}

copy();