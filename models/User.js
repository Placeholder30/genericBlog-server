const validator = require("validator");
const pool = require("../db");
const bcrypt = require("bcrypt");

class User {
  constructor(reqData) {
    this.data = reqData;
  }

  register = async () => {
    const client = await pool.connect();
    console.log(this.data);
    let { email, firstName, lastName, password } = this.data;
    console.log(email, password, firstName, lastName);

    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt);

    const result = await client.query(
      "INSERT INTO users (email , password, first_name, last_name, last_login) VALUES ($1, $2, $3, $4, NOW())",
      [email, hash, firstName, lastName]
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
        const result = await bcrypt.compare(password, truePassword);
        if (result) {
          resolve(true);
          client.query("UPDATE users SET last_login = NOW() WHERE email = $1", [
            email,
          ]);
        }
      } catch (error) {
        console.log(error);
      }
    });
  };
}

module.exports = User;
