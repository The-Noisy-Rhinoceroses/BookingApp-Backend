const express = require('express')
const router = express.Router();

const customerRoutes = (router) => (db) => {
  router.get('/', (req, res, next) => {
    db.collection('customers')
      .find()
      .toArray()
      .then(barbers => res.json(barbers))
      .catch(next);
  });
  router.post('/', (req, res, next) => {
    const { firstName, lastName, phoneNumber, email } = req.body;
    db.collection('customers')
      .insertOne({ firstName, lastName, phoneNumber, email })
      .then(newCustomer => {
          res.status(200).json(newCustomer);
      })
      .catch(next);
  });
  return router;
};

module.exports = customerRoutes(router);
