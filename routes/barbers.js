const express = require('express');
const router = express.Router();

const barberRoutes = (router) => (db) => {
  router.get('/', function(req, res, next) {
    db.collection('barbers')
    .find()
    .toArray()
    .then(barbers => res.status(200).json(barbers))
    .catch(next);
  });

  router.post('/', (req, res, next) => {
    const { name } = req.body;
    db.collection('barbers')
      .insertOne({ name })
      .then(newBarber => res.status(201).json(newBarber))
      .catch(next);
  });

  return router;
};

module.exports = barberRoutes(router);
