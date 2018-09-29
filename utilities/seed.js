require('../secrets');

// Module dependencies;
const barberSchema = require('../db/barbers');
const customerSchema = require('../db/customers');
const appointmentSchema = require('../db/appointments');
const { ObjectId } = require('mongodb');
const assert = require('assert');

// Helper functions to randomize data selection;
const phoneNumberGenerator = () => (Math.random() * 10000000000).toString();
const selectRandomId = (arr) => ObjectId(arr[Math.floor(Math.random() * arr.length)]._id);

// Drop collections, create collections with validations, and then insert seed data;
const populateDb = async db => {
  await Promise.all([
    db.collection('barbers').drop(),
    db.collection('appointments').drop(),
    db.collection('customers').drop()
  ]);

  await Promise.all([
    barberSchema(db);
    customerSchema(db);
    appointmentSchema(db);
  ]);

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

  await db.collection('appointments').insertMany([
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

// Connect to DB and run seed function;
const { MongoClient } = require('mongodb');
const url = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}${process.env.URL}`;
const dbName = process.env.DATABASE_NAME;

const initializeDb = (err, client) => {
  assert.equal(null, err);
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  populateDb(db); // If we were performing other operations and potential race conditions arose, then we could await this (it is an asyncrhonous function);
};

MongoClient.connect(url, { useNewUrlParser: true }, initializeDb);
