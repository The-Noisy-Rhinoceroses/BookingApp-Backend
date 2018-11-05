const express = require('express');
const router = express.Router();
const axios = require('axios');

const servicesRouter = db => {
  router.get('/', (req, res, next) => {
    db.collection('services')
      .find()
      .toArray()
      .then(services => res.json(services))
      .catch(next);
  });

  router.post('/pay', (req, res, next) => {
    const { amount } = req.body
    const dataParameter = {
      amount_money: {
        amount,
        currency_code: 'USD'
      },
      callback_url: process.env.SQUARE_CALLBACK_URL,
      client_id: process.env.SANDBOX_APP_ID,
      version: '1.3',
      notes: 'notes for the transaction',
      options: {
        supported_tender_types: [
          'CREDIT_CARD',
          'CASH',
          'OTHER',
          'SQUARE_GIFT_CARD',
          'CARD_ON_FILE'
        ]
      }
    };

    const url = `square-commerce-v1://payment/create?data=${JSON.stringify(dataParameter)}`;
    res.json(url)
  });

  router.post('/success', (req, res, next) => {
    console.log(req.body);
    console.log('POST!');
  });

  router.get('/success', (req, res, next) => {
    console.log('GET LINE 51!');
  });

  return router;
};

module.exports = servicesRouter;
