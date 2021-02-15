const validator = require("validator");
const pool = require("../db");
const bcrypt = require("bcrypt");

class User {
  constructor(reqData) {
    this.data = reqData;
  }

  register = async () => {
    const client = await pool.connect();
    let { email, password } = this.data;

    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt);

    const result = await client.query(
      "INSERT INTO users (email , password) VALUES ($1, $2)",
      [email, hash]
    );
    client.end();
  };
  login = async () => {
    const client = await pool.connect();
    return new Promise(async (resolve, reject) => {
      let { email, password } = this.data;
      let result = await client.query(
        "SELECT password FROM users WHERE email = $1 ",
        [email]
      );
      const truePassword = result.rows[0].password;
      try {
        resolve(bcrypt.compare(password, truePassword));
      } catch (error) {
        console.log(error);
      }
    });
  };
}

module.exports = User;
