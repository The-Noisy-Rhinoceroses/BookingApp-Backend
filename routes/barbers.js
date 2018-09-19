const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');

const barberRoutes = (router) => (db) => {
  router.get('/', function(req, res, next) {
    db.collection('barbers')
      .find()
      .toArray()
      .then(barbers => res.status(200).json(barbers))
      .catch(next);
  });

  router.get('/:id', function(req, res, next) {
    const barberId = req.params.id;
    const targetId = ObjectId(barberId);
    db.collection('barbers')
      .find({ _id: targetId })
      .toArray()
      .then(singleBarber => res.status(200).json(singleBarber))
      .catch(next);
  });

  router.post('/', (req, res, next) => {
    const { name } = req.body;
    db.collection('barbers')
      .insertOne({ name })
      .then(newBarber => res.status(201).json(newBarber))
      .catch(next);
  });

  router.delete('/:barberId', (req, res, next) => {
    const { barberId } = req.params;
    db.collection('barbers')
      .deleteOne({ _id: ObjectId(barberId) })
      .then(() => res.status(200).send())
      .catch(next);
  });

  return router;
};

module.exports = barberRoutes(router);
