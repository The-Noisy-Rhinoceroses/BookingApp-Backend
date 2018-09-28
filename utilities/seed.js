require('../secrets');

const barberSchema = require('../db/barbers');
const customerSchema = require('../db/customers');
const appointmentSchema = require('../db/appointments');
const assert = require('assert');
const { ObjectId } = require('mongodb');

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
  await appointmentSchema(db);

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
    ]).toArray();

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
  ]).toArray();

  const selectRandomId = (arr) => ObjectId(arr[Math.floor(Math.random() * arr.length)]._id);

  const appointments = await db.collection('appointments').insertMany([
    {
      barberId: selectRandomId(barbers),
      customerId: selectRandomId(customers),
      date: new Date("October 3, 2018 12:30:00")
    },
    {
      barberId: selectRandomId(barbers),
      customerId: selectRandomId(customers),
      date: new Date("October 3, 2018 13:30:00")
    },
    {
      barberId: selectRandomId(barbers),
      customerId: selectRandomId(customers),
      date: new Date("October 3, 2018 14:30:00")
    },
    {
      barberId: selectRandomId(barbers),
      customerId: selectRandomId(customers),
      date: new Date("October 3, 2018 15:30:00")
    },
    {
      barberId: selectRandomId(barbers),
      customerId: selectRandomId(customers),
      date: new Date("October 3, 2018 10:30:00")
    },
    {
      barberId: selectRandomId(barbers),
      customerId: selectRandomId(customers),
      date: new Date("October 3, 2018 11:30:00")
    },
  ])
}

const initializeDb = (err, client) => {
  assert.equal(null, err);
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  populateDb(db);
};

MongoClient.connect(
  url,
  { useNewUrlParser: true },
  initializeDb
);
