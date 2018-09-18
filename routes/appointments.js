const express = require('express');
const router = express.Router();
const moment = require('moment');

const appointmentRouter = router => db => {
  router.get('/day', (req, res, next) => {
    let { date } = req.query;
    let formattedDate = moment(date, 'YYYY-MM-DD');

    db.collection('appointments')
      .find({
        date: {
          $gte: new Date(formattedDate.format()),
          $lt: new Date(formattedDate.add(1, 'day').format())
        }
      })
      .toArray()
      .then(appointments => res.json(appointments))
      .catch(next);
  });
  router.get('/week', (req, res, next) => {
    let { date } = req.query;

    let startDate = moment(date, 'YYYY-MM-DD').isoWeekday(7);
    let endDate = moment(date, 'YYYY-MM-DD')
      .add(1, 'week')
      .isoWeekday(7);

    db.collection('appointments')
      .find({
        date: {
          $gte: new Date(startDate.format()),
          $lt: new Date(endDate.format())
        }
      })
      .toArray()
      .then(appointments => res.json(appointments))
      .catch(next);
  });

  router.get('/month', (req, res, next) => {
    let { date } = req.query;
    let formattedDate = moment(date, 'YYYY-MM-DD');

    db.collection('appointments')
      .find({
        date: {
          $gte: new Date(formattedDate.format()),
          $lt: new Date(formattedDate.add(1, 'month').format())
        }
      })
      .toArray()
      .then(appointments => res.json(appointments))
      .catch(next);
  });

  return router;
};

module.exports = appointmentRouter(router);
