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
    const { firstName, lastName, email, phoneNumber } = req.body;
    const imgUrl = req.body.imgUrl || '';
    db.collection('barbers')
      .insertOne({ firstName, lastName, email, imgUrl, phoneNumber })
      .then(() => res.status(201).send('Barber Created'))
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
