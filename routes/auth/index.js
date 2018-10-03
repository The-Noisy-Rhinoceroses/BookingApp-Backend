const express = require('express');
const crypto = require('crypto');
const router = express.Router();
const {
  generateSalt,
  correctPassword,
  encryptPassword
} = require('../../utilities/hashing');

const authRouter = db => {
  router.post('/login', async (req, res, next) => {
    const candidatePwd = req.body.password;
    const user = await db
      .collection('barbers')
      .findOne({ email: req.body.email });
    if (!user) {
      res.status(401).send('Wrong username and/or password');
    }
    else if (correctPassword(candidatePwd, user.salt, user.password)) {
      req.login(user, err => {
        if (err) {
          next(err);
        } else {
          res.json(user);
        }
      });
    }
    else {
      res.status(401).send('Wrong username and/or password');
    }
  });

  router.post('/logout', (req, res) => {
    req.logout();
    req.session.destroy();
    res.send('you have logged out!');
  });

  router.post('/signup', (req, res, next) => {
    const { firstName, lastName, email, phoneNumber, password } = req.body;
    const imgUrl = req.body.imgUrl || '';
    const salt = generateSalt();
    const encryptedPassword = encryptPassword(password, salt);

    if (req.user && req.user.isBarber) {
      db.collection('barbers')
        .insertOne({
          firstName,
          lastName,
          email,
          imgUrl,
          phoneNumber,
          salt,
          password: encryptedPassword,
          isBarber: true
        })
        .then(() => res.status(201).send('Barber Created'))
        .catch(next);
    }
    else {
      res.status(403).send('Not Authorized');
    }
  });

  router.get('/me', (req, res, next) => {
    res.json(req.user);
  });

  return router;
};

module.exports = authRouter;
