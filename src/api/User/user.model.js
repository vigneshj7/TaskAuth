const connection = require('../../helpers/databaseConnection');
class user {
  static addUser(body) {
    return new Promise((resolve, reject) => {
      connection.query(`insert into user set ?`, [body], (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });
  }

  static getUser(userId) {
    return new Promise((resolve, reject) => {
      connection.query(
        `select * from user where userId = ? and status ="active" `,
        [userId],
        (err, rows) => {
          if (err) return reject(err);
          resolve(rows);
        }
      );
    });
  }

  static updateUser(body, userId) {
    return new Promise((resolve, reject) => {
      connection.query(
        `update user set ? where userId = ? `,
        [body, userId],
        (err, rows) => {
          if (err) return reject(err);
          resolve(rows);
        }
      );
    });
  }

  static deleteUser(userId) {
    return new Promise((resolve, reject) => {
      connection.query(
        `update user set status="inactive" where userId = ?`,
        [userId],
        (err, rows) => {
          if (err) return reject(err);
          resolve(rows);
        }
      );
    });
  }

  static addEvents(body) {
    return new Promise((resolve, reject) => {
      connection.query(`insert into events set ?`, [body], (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });
  }

  static updateEvents(body, userId, eventId) {
    return new Promise((resolve, reject) => {
      connection.query(
        `update events set ? where userId =? and eventId = ? and status="active" `,
        [body, userId, eventId],
        (err, rows) => {
          if (err) return reject(err);
          resolve(rows);
        }
      );
    });
  }

  static deleteEvents(userId, eventId) {
    return new Promise((resolve, reject) => {
      connection.query(
        `update events set status="inactive" where userId =? and  eventId = ?`,
        [userId, eventId],
        (err, rows) => {
          if (err) return reject(err);
          resolve(rows);
        }
      );
    });
  }

  static eventList(searchByName, searchByCity, sortBy, sortType) {
    return new Promise((resolve, reject) => {
      connection.query(
        `select * from events where eventName = ? and city = ? order by ${sortBy} ${sortType}`,
        [searchByName, searchByCity],
        (err, rows) => {
          if (err) return reject(err);
          resolve(rows);
        }
      );
    });
  }
}

module.exports = user;
