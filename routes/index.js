const express = require('express');
const indexRouter = express.Router();
const barberRouter = require('./barbers');
const customerRouter = require('./customers');

const apiRoutes = (indexRouter, barberRouter, customerRouter) => (db) => {
  indexRouter.use('/barbers', barberRouter(db));
  indexRouter.use('/customers', customerRouter(db));
  return indexRouter;
}

module.exports = apiRoutes(indexRouter, barberRouter, customerRouter);
