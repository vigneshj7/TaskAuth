const router = require('express').Router();
const loginController = require('./login.controller');

router.get('/:email', loginController.checkUser);
module.exports = router;
