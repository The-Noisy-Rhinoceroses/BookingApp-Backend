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
    res.send("you have logged out!");
  });

  router.get('/me', (req, res, next) => {
    res.json(req.user);
  });

  return router;
};

module.exports = authRouter;
