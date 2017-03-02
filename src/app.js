const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const routes = require('./routes');
const iocBuilder = require('./ioc');
const autonode = require('../libraries/autonode');

const app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.scope = iocBuilder.Container; // eslint-disable-line no-param-reassign
  next();
});

// Register all the routers
_.forEach(routes, router => app.use(router));

module.exports = app;
