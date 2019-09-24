'user strict';
const mysql = require('mysql');
const chalk = require('chalk');
const {
  DB_HOST,
  DB_NAME,
  DB_USERNAME,
  DB_PASSWORD,
  DB_TIMEZONE
} = require('../config');

let db_config = {
  host: DB_HOST,
  database: DB_NAME,
  user: DB_USERNAME,
  password: DB_PASSWORD,
  timezone: DB_TIMEZONE,
  timeout: 90000
};

let connection = '';

function startConnection() {
  connection = mysql.createConnection(db_config);

  connection.connect(function(err) {
    if (err) {
      console.error(chalk.red('error connecting MYSQL : ' + err.stack));
      setTimeout(startConnection, 2000);
    } else console.log(chalk.green('MYSQL connected as id : ' + connection.threadId));
  });

  connection.on('error', function(err) {
    console.error(chalk.red('error  : ' + err.stack));
    if (err.fatal) startConnection();
    if (err.code === 'PROTOCOL_CONNECTION_LOST') startConnection();
  });
}

setInterval(function() {
  connection.query('SELECT 1');
}, 5000);

startConnection();

module.exports = connection;
