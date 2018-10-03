const express = require('express');
const router = express.Router();

const authRouter = db => {
  router.post('/login', async (req, res, next) => {
    const user = await db.collection('barbers').findOne({ email: req.body.email });
    req.login(user, err => {
      if (err) {
        next(err);
      }
      else {
        res.json(user);
      }
    });
  });

  router.post('/logout', (req, res) => {
    req.logout();
    req.session.destroy();
    res.send('you have logged out!');
  });

  router.post('/signup', (req, res, next) => {
    const { firstName, lastName, email, phoneNumber, password } = req.body;
    const imgUrl = req.body.imgUrl || '';
    //TODO HASH PASSWORDS
    if (req.user && req.user.isBarber) {
      db.collection('barbers')
        .insertOne({ firstName, lastName, email, imgUrl, phoneNumber, password, isBarber: true })
        .then(() => res.status(201).send('Barber Created'))
        .catch(next);
    }
    else {
      res.status(403).send('Not Authorized')
    }
  });

  router.get('/me', (req, res, next) => {
    res.json(req.user);
  });

  return router;
};

module.exports = authRouter;
