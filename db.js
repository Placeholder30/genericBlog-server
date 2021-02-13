const { Client, Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.CONNECTIONSTRING,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = pool;
