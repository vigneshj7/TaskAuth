const router = require('express').Router();
const userController = require('./user.controller');
const jwt = require('jsonwebtoken');
const { TOKEN_SECRET } = require('../../config');

const authCheck = (req, res, next) => {
  try {
    const auth_token = req.header('auth_token');
    if (!auth_token) return res.status(400).json('Unauthorized Routes');
    const verifyToken = jwt.verify(auth_token, TOKEN_SECRET);
    if (verifyToken) {
      req.user = verifyToken;
      next();
    }
  } catch (error) {
    return res.status(401).json({
      status: 401,
      message: 'Invalid token'
    });
  }
};

router.post('/', userController.addUser);
router.get('/:userId', authCheck, userController.getUser);
router.put('/edit/:userId', authCheck, userController.updateUser);
router.delete('/delete/:userId', authCheck, userController.deleteUser);

router.post('/events/:userId', authCheck, userController.addEvents);
router.put(
  '/events/edit/:userId/:eventId',
  authCheck,
  userController.updateEvents
);
router.delete(
  '/events/delete/:userId/:eventId',
  authCheck,
  userController.deleteEvents
);
router.get(
  '/eventList/:searchByName/:searchByCity/:sortBy/:sortType',
  userController.eventList
);

module.exports = router;
