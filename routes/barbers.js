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

  router.get('/:barberId', function(req, res, next) {
    const { barberId } = req.params;
    db.collection('barbers')
      .find({ _id: ObjectId(barberId) })
      .toArray()
      .then(singleBarber => {
        if (!singleBarber.length) res.status(404).send('Not Found')
        else res.status(200).json(singleBarber)
      })
      .catch(next);
  });

  router.post('/', (req, res, next) => {
    const { name } = req.body;
    db.collection('barbers')
      .insertOne({ name })
      .then(newBarber => res.status(201).json(newBarber))
      .catch(next);
  });

  router.put('/:barberId', (req, res, next) => {
    const { barberId } = req.params;
    const { name } = req.body;
    db.collection('barbers')
      .updateOne({ _id: ObjectId(barberId) }, { $set: { name } })
      .then(updatedBarber => res.status(201).json(updatedBarber))
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
