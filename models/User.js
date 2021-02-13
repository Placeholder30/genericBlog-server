const validator = require("validator");
const pool = require("../db");

class User {
  constructor(reqData) {
    this.data = reqData;
  }

  register = async () => {
    const client = await pool.connect();
    const result = await client.query(
      "INSERT INTO users (email , password) VALUES ($1, $2)",
      [this.data.email, this.data.password]
    );
    client.end();
    return result;
  };
}

module.exports = User;
