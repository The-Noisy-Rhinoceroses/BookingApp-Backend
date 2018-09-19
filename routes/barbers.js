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
    const {id} = req.params;
    const barberId = ObjectId(id);
    db.collection('barbers')
      .find({ _id: barberId })
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

  router.put('/:id', (req, res, next) => {
    const barberId = ObjectId(req.params.id);
    const { name } = req.body;
    db.collection('barbers')
      .updateOne({ _id: barberId }, { $set: { name } })
      .then(updatedBarber => res.status(201).json(updatedBarber))
      .catch(next);
  });

  router.delete('/:id', (req, res, next) => {
    const barberId = ObjectId(req.params.id);
    db.collection('barbers')
      .deleteOne({ _id: barberId })
      .then(() => res.status(200).send())
      .catch(next);
  });

  return router;
};

module.exports = barberRoutes(router);
