const express = require('express');
const indexRouter = express.Router();
const barberRouter = require('./barbers');

const apiRoutes = (indexRouter, barberRouter) => (db) => {
  indexRouter.use('/barbers', barberRouter(db));
  return indexRouter;
}

module.exports = apiRoutes(indexRouter, barberRouter);
