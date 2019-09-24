const loginModel = require('./login.model');
const chalk = require('chalk');
const jwt = require('jsonwebtoken');

const TOKEN_SECRET = '12345';

const checkUser = async (req, res, next) => {
  const email = req.params.email;
  try {
    const result = await loginModel.checkUser(email);
    if (!result.length) {
      res.status(404);
      throw new Error('No User Found');
    }
    const token = jwt.sign({ userId: result[0].userId }, TOKEN_SECRET);
    res.header('auth_token', token);
    res.send(token);
  } catch (error) {
    console.error(chalk.red(error));
    next(error);
  }
};

module.exports = {
  checkUser
};
