var express = require('express');
var router = express.Router();

/* GET barbers listing. */
const barberRoutes = (router) => (db) => {
  router.get('/', function(req, res, next) {
    db.collection("Barbers")
    .find()
    .toArray()
    .then(barbers => res.json(barbers))
    .catch(next);
  });

  return router;
};

module.exports = barberRoutes(router);
