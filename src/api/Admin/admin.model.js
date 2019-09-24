const connection = require('../../helpers/databaseConnection');
class admin {
  static getAllUser() {
    return new Promise((resolve, reject) => {
      connection.query(
        `select * from user where status ="active" and role="user" `,
        (err, rows) => {
          if (err) return reject(err);
          resolve(rows);
        }
      );
    });
  }

  static getSingleUserEvents(userId) {
    return new Promise((resolve, reject) => {
      connection.query(
        `select * from events where userId =? and status ="active" `,
        [userId],
        (err, rows) => {
          if (err) return reject(err);
          resolve(rows);
        }
      );
    });
  }
}

module.exports = admin;
