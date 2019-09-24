const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const responseTime = require('response-time');
const routes = require('./routes');
require('./helpers/databaseConnection');
const { errorHandler, notFound } = require('./middleware');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(responseTime());
app.use(routes);
app.use(errorHandler);
app.use(notFound);

module.exports = app;
