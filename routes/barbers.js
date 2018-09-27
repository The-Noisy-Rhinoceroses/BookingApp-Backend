const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');
// const { getAppointmentsByTimePeriod } = require('../utilities/queries');

const barberRouter = db => {
  router.get('/', function(req, res, next) {
    db.collection('barbers')
      .find()
      .toArray()
      .then(allBarbers => allBarbers.map(barber => {
        const {firstName, lastName, imgUrl, _id} = barber;
        return {firstName, lastName, imgUrl, _id};
      }))
      .then(barbers => res.status(200).json(barbers))
      .catch(next);
  });

  router.get('/:barberId', function(req, res, next) {
    const { barberId } = req.params;
    db.collection('barbers')
      .findOne({ _id: ObjectId(barberId) })
      .then(singleBarber => {
        const {firstName, lastName, phoneNumber, email, imgUrl, _id} = singleBarber;
        res.status(200).json({firstName, lastName, phoneNumber, email, imgUrl, _id})
      })
      .catch(next);
  });

  router.get('/:barberId/appointments', function(req, res, next) {
    const { barberId } = req.params;
    db.collection('appointments')
      .find({ barberId: ObjectId(barberId) })
      .toArray()
      .then(appointments => res.status(200).json(appointments))
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
    const { firstName, lastName, email, phoneNumber, imgUrl } = req.body;
    db.collection('barbers')
      .updateOne({ _id: ObjectId(barberId) }, { $set: { firstName, lastName, email, phoneNumber, imgUrl } })
      .then(updatedBarber => res.status(201).json(updatedBarber))
      .catch(next);
  });

  router.delete('/:barberId', (req, res, next) => {
    const { barberId } = req.params;
    db.collection('barbers')
      .deleteOne({ _id: ObjectId(barberId) })
      .then(() => res.status(200).send('Successfully Deleted'))
      .catch(next);
  });

  return router;
};

module.exports = barberRouter;
