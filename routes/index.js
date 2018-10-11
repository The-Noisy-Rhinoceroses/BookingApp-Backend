// Instantiate our apiRouter that will modularize all of our routes;
const express = require('express');
const router = express.Router();

// Other sub-routers;
const barberRouter = require('./barbers');
const customerRouter = require('./customers');
const appointmentRouter = require('./appointments');
const servicesRouter = require('./services');

// Consider: router.use(p1, p2), where p1 is the path and p2 is the callback/middleware function;
// Our apiRouter is a function that takes in a database object and ultimately returns the router aka the middleware function;
const apiRouter = db => {
  router.use('/barbers', barberRouter(db));
  router.use('/customers', customerRouter(db));
  router.use('/appointments', appointmentRouter(db));
  router.use('/services', servicesRouter(db));

  router.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
  });

  return router;
}

// Export our apiRouter so that the main app can use this root router with the "/api" path;
module.exports = apiRouter;
