const adminModel = require('./admin.model');
const chalk = require('chalk');

const getAllUser = async (req, res, next) => {
  try {
    const result = await adminModel.getAllUser();
    if (!result.length) {
      res.status(404);
      throw new Error('No User Found');
    }
    res.send(result);
  } catch (error) {
    console.error(chalk.red(error));
    next(error);
  }
};

const getAllUserEvents = async (req, res, next) => {
  try {
    const userList = await adminModel.getAllUser();
    if (!userList.length) {
      res.status(404);
      throw new Error('No User Found');
    } else {
      const fullEventDetails = userList.map(async users => {
        const singleUserEvents = await adminModel.getSingleUserEvents(
          users.userId
        );
        if (singleUserEvents.length > 0) {
          users.events = singleUserEvents;
        } else {
          users.events = 'Events not Added';
        }
      });
      await Promise.all(fullEventDetails);
      res.send(userList);
    }
  } catch (error) {
    console.error(chalk.red(error));
    next(error);
  }
};

module.exports = {
  getAllUser,
  getAllUserEvents
};
