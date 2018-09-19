const express = require('express');
const indexRouter = express.Router();
const barberRouter = require('./barbers');
const customerRouter = require('./customers');
const appointmentRouter = require('./appointments');

const apiRoutes = (indexRouter, barberRouter, customerRouter, appointmentRouter) => (db) => {
  indexRouter.use('/barbers', barberRouter(db));
  indexRouter.use('/customers', customerRouter(db));
  indexRouter.use('/appointments', appointmentRouter(db));

  indexRouter.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
  });

  return indexRouter;
}

module.exports = apiRoutes(indexRouter, barberRouter, customerRouter, appointmentRouter);
