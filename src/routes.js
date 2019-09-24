const routes = require('express').Router();
const login = require('./api/Login/login.routes');
const user = require('./api/User/user.routes');
const admin = require('./api/Admin/admin.routes');

routes.use('/api/login', login);
routes.use('/api/user', user);
routes.use('/api/admin', admin);

module.exports = routes;
