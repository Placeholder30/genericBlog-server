const pool = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class User {
  constructor(reqData) {
    this.data = reqData;
  }

  register = async () => {
    const client = await pool.connect();
    let { email, firstName, lastName, password } = this.data;

    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt);

    const result = await client.query(
      "INSERT INTO users (email , password, first_name, last_name, last_login) VALUES ($1, $2, $3, $4, NOW())",
      [email, hash, firstName, lastName]
    );
    client.release();
  };
  login = async () => {
    const client = await pool.connect();
    return new Promise(async (resolve, reject) => {
      let { email, password } = this.data;
      let result = await client.query(
        "SELECT password, user_id FROM users WHERE email = $1 ",
        [email]
      );
      const truePassword = result.rows[0].password;
      const user_id = result.rows[0].user_id;

      try {
        const result = await bcrypt.compare(password, truePassword);
        if (result) {
          client.query("UPDATE users SET last_login = NOW() WHERE email = $1", [
            email,
          ]);
          const token = jwt.sign({ id: user_id }, process.env.TOKEN_SECRET);
          resolve(token);
        } else {
          reject(false);
        }
      } catch (error) {
        console.log(error);
      }
      client.release();
    });
  };
}

module.exports = User;
