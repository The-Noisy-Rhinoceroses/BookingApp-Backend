const express = require('express')
const router = express.Router();

const servicesRouter = db => {
    router.get('/', (req, res, next) => {
      db.collection('services')
        .find()
        .toArray()
        .then(services => res.json(services))
        .catch(next);
    });

    return router;
};

module.exports = servicesRouter;