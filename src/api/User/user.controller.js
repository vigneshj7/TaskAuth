const userModel = require('./user.model');
const chalk = require('chalk');

const addUser = async (req, res, next) => {
  const body = req.body;
  try {
    const result = await userModel.addUser(body);
    if (result) {
      // console.log(result);
      res.send(result);
    }
  } catch (error) {
    console.error(chalk.red(error));
    res.status(500);
    next(error);
  }
};

const getUser = async (req, res, next) => {
  const userId = req.params.userId;
  const tokenUserId = req.user.userId;
  try {
    if (parseInt(userId) === parseInt(tokenUserId)) {
      const result = await userModel.getUser(userId);
      if (!result.length) {
        res.status(404);
        throw new Error('No User Found');
      }
      res.send(result);
    } else {
      res.status(401).json({
        status: 401,
        message: 'Invalid token'
      });
    }
  } catch (error) {
    console.error(chalk.red(error));
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  const body = req.body;
  const userId = req.params.userId;
  const tokenUserId = req.user.userId;

  try {
    if (parseInt(userId) === parseInt(tokenUserId)) {
      const result = await userModel.updateUser(body, userId);
      if (result) {
        if (result.affectedRows === 0) {
          res.status(404);
          throw new Error('No User Found');
        } else {
          res.send(result);
        }
      }
    } else {
      res.status(401).json({
        status: 401,
        message: 'Invalid token'
      });
    }
  } catch (error) {
    console.error(chalk.red(error));
    res.status(500);
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  const userId = req.params.userId;
  const tokenUserId = req.user.userId;

  try {
    if (parseInt(userId) === parseInt(tokenUserId)) {
      const result = await userModel.deleteUser(userId);
      if (result) {
        if (result.affectedRows === 0) {
          res.status(404);
          throw new Error('No User Found');
        } else {
          res.send(result);
        }
      }
    } else {
      res.status(401).json({
        status: 401,
        message: 'Invalid token'
      });
    }
  } catch (error) {
    console.error(chalk.red(error));
    res.status(500);
    next(error);
  }
};

const addEvents = async (req, res, next) => {
  const body = req.body;
  const userId = req.params.userId;
  const tokenUserId = req.user.userId;

  try {
    if (parseInt(userId) === parseInt(tokenUserId)) {
      body.userId = userId;
      const result = await userModel.addEvents(body);
      if (result) {
        res.send(result);
      }
    } else {
      res.status(401).json({
        status: 401,
        message: 'Invalid token'
      });
    }
  } catch (error) {
    console.error(chalk.red(error));
    res.status(500);
    next(error);
  }
};

const updateEvents = async (req, res, next) => {
  const body = req.body;
  const userId = req.params.userId;
  const eventId = req.params.eventId;
  const tokenUserId = req.user.userId;

  try {
    if (parseInt(userId) === parseInt(tokenUserId)) {
      const result = await userModel.updateEvents(body, userId, eventId);
      if (result) {
        if (result.affectedRows === 0) {
          res.status(404);
          throw new Error('No User Found');
        } else {
          res.send(result);
        }
      }
    } else {
      res.status(401).json({
        status: 401,
        message: 'Invalid token'
      });
    }
  } catch (error) {
    console.error(chalk.red(error));
    res.status(500);
    next(error);
  }
};

const deleteEvents = async (req, res, next) => {
  const userId = req.params.userId;
  const tokenUserId = req.user.userId;
  const eventId = req.params.eventId;

  try {
    if (parseInt(userId) === parseInt(tokenUserId)) {
      const result = await userModel.deleteEvents(userId, eventId);
      if (result) {
        if (result.affectedRows === 0) {
          res.status(404);
          throw new Error('No User Found');
        } else {
          res.send(result);
        }
      }
    } else {
      res.status(401).json({
        status: 401,
        message: 'Invalid token'
      });
    }
  } catch (error) {
    console.error(chalk.red(error));
    res.status(500);
    next(error);
  }
};

const eventList = async (req, res, next) => {
  const searchByName = req.params.searchByName;
  const searchByCity = req.params.searchByCity;
  const sortBy = req.params.sortBy;
  const sortType = req.params.sortType;
  console.log(`${searchByName} - ${searchByCity}- ${sortBy}- ${sortType}`);
  try {
    const result = await userModel.eventList(
      searchByName,
      searchByCity,
      sortBy,
      sortType
    );
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

module.exports = {
  addUser,
  getUser,
  updateUser,
  deleteUser,
  addEvents,
  updateEvents,
  deleteEvents,
  eventList
};
