require('../secrets');
const barberSchema = require('../db/barbers')
const customerSchema = require('../db/customers')
const assert = require('assert');

const { MongoClient } = require('mongodb');

const url = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}${
  process.env.URL
}`;

const dbName = process.env.DATABASE_NAME;

const phoneNumberGenerator = () => (Math.random() * 10000000000).toString();

const populateDb = async db => {
  await Promise.all([
    db.collection('barbers').drop(),
    db.collection('appointments').drop(),
    db.collection('customers').drop()
  ]);
  await barberSchema(db);
  await customerSchema(db);
  const barbers = await db
    .collection('barbers')
    .insertMany([
      {
        firstName: 'Rick',
        lastName: 'Sanchez',
        phoneNumber: phoneNumberGenerator(),
        email: 'rick@lmao.com'
      },
      {
        firstName: 'Dan',
        lastName: 'Man',
        phoneNumber: phoneNumberGenerator(),
        email: 'dan@lmao.com'
      },
      {
        firstName: 'John',
        lastName: 'Doe',
        phoneNumber: phoneNumberGenerator(),
        email: 'john@lmao.com'
      },
      {
        firstName: 'Allan',
        lastName: 'Lugia',
        phoneNumber: phoneNumberGenerator(),
        email: 'allan@lmao.com'
      }
    ]);
  const customers = await db.collection('customers').insertMany([
    {
      firstName: 'Bob',
      lastName: 'Ross',
      phoneNumber: phoneNumberGenerator(),
      email: 'bobross@lmao.com'
    },
    {
      firstName: 'Rick',
      lastName: 'Ross',
      phoneNumber: phoneNumberGenerator(),
      email: 'bobross@lmao.com'
    },
    {
      firstName: 'Kendrick',
      lastName: 'Lamar',
      phoneNumber: phoneNumberGenerator(),
      email: 'Klmar@lmao.com'
    },
    {
      firstName: 'Will',
      lastName: 'Smith',
      phoneNumber: phoneNumberGenerator(),
      email: 'Wsmith@lmao.com'
    }
  ])
};

const initializeDb = (err, client) => {
  assert.equal(null, err);
  console.log('Connected successfully to server');
  const db = client.db(dbName);
};

MongoClient.connect(
  url,
  { useNewUrlParser: true },
  initializeDb
);
