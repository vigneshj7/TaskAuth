const connection = require('../../helpers/databaseConnection');
class login {
  static checkUser(email) {
    return new Promise((resolve, reject) => {
      connection.query(
        `select * from user where email = ? and status ="active" `,
        [email],
        (err, rows) => {
          if (err) return reject(err);
          resolve(rows);
        }
      );
    });
  }
}

module.exports = login;
