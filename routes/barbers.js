const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');

const barberRouter = db => {
  router.get('/', function(req, res, next) {
    db.collection('barbers')
      .find()
      .toArray()
      .then(allBarbers =>
        allBarbers.map(barber => {
          const { firstName, lastName, imgUrl, _id, description } = barber;
          return { firstName, lastName, imgUrl, _id, description };
        })
      )
      .then(barbers => res.status(200).json(barbers))
      .catch(next);
  });

  router.get('/:barberId', function(req, res, next) {
    const { barberId } = req.params;
    db.collection('barbers')
      .findOne({ _id: ObjectId(barberId) })
      .then(singleBarber => {
        const {
          firstName,
          lastName,
          phoneNumber,
          email,
          imgUrl,
          description,
          _id
        } = singleBarber;
        res.status(200).json({
          firstName,
          lastName,
          phoneNumber,
          email,
          imgUrl,
          _id,
          description
        });
      })
      .catch(next);
  });

  router.get('/:barberId/appointments', function(req, res, next) {
    const { barberId } = req.params;
    const currentDate = new Date();
    currentDate.setHours(9);
    db.collection('appointments')
      .aggregate([
        {
          $match: {
            $and: [
              { barberId: ObjectId(barberId) },
              { date: { $gt: currentDate } }
            ]
          }
        },
        {
          $lookup: {
            from: 'customers',
            localField: 'customerId',
            foreignField: '_id',
            as: 'customer'
          }
        },
        { $unwind: '$customer' }
      ])
      .toArray()
      .then(appointments => res.json(appointments))
      .catch(next);
  });

  router.put('/:barberId', (req, res, next) => {
    const { barberId } = req.params;
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      imgUrl,
      description
    } = req.body;
    db.collection('barbers')
      .updateOne(
        { _id: ObjectId(barberId) },
        {
          $set: { firstName, lastName, email, phoneNumber, imgUrl, description }
        }
      )
      .then(updatedBarber => res.status(201).json(updatedBarber))
      .catch(next);
  });

  router.post('/:barberId/review', (req, res, next) => {
    const { barberId } = req.params;
    const { rating, body, customerId } = req.body;
    db.collection('reviews')
      .insertOne({
        rating,
        body,
        barberId: ObjectId(barberId),
        customerId: ObjectId(customerId)
      })
      .then(() => {
        res.sendStatus(201);
      })
      .catch(next);
  });

  router.get('/:barberId/review', (req, res, next) => {
    const { barberId } = req.params;
    db.collection('reviews')
      .find({
        barberId: ObjectId(barberId)
      })
      .toArray()
      .then(review => res.json(review))
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
