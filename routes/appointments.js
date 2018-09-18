const express = require('express');
const router = express.Router();
const moment = require('moment');
const { getAppointmentsByDay, getAppointmentsByTimePeriod } = require('../utilities/utils');

const appointmentRouter = router => db => {
  router.get('/day', (req, res, next) => {
    let { date } = req.query;
    let formattedDate = moment(date, 'MM-DD-YYYY');

    getAppointmentsByDay(db, formattedDate)
      .then(appointments => res.json(appointments))
      .catch(next);
  });

  router.get('/week', (req, res, next) => {
    let { date } = req.query;
    getAppointmentsByTimePeriod(db, date, "week")
      .then(appointments => res.json(appointments))
      .catch(next);
  });

  router.get('/month', (req, res, next) => {
    let { date } = req.query;
    getAppointmentsByTimePeriod(db, date, "month")
      .then(appointments => res.json(appointments))
      .catch(next);
  });

  return router;
};

module.exports = appointmentRouter(router);
