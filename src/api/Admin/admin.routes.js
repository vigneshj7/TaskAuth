const router = require('express').Router();
const adminController = require('./admin.controller');

router.get('/', adminController.getAllUser);
router.get('/events', adminController.getAllUserEvents);

module.exports = router;
