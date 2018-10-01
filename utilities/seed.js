require('../secrets');

// Module dependencies;
const barberSchema = require('../db/barbers');
const customerSchema = require('../db/customers');
const appointmentSchema = require('../db/appointments');
const { ObjectId } = require('mongodb');
const assert = require('assert');

// Helper functions to randomize data selection;
const phoneNumberGenerator = () =>
  Math.floor(Math.random() * 10000000000).toString();
const selectRandomId = collection =>
  ObjectId(
    collection.ops[Math.floor(Math.random() * collection.ops.length)]._id
  );

// Drop collections, create collections with validations, and then insert seed data;
const populateDb = async db => {
  const existingCollections = await db.collections();
  const existingCollectionsNames = existingCollections.map(
    collection => collection.s.name
  );
  const collectionsToSeed = ['barbersx', 'appointmentsx', 'customersx'];
  for (let i = 0; i < existingCollectionsNames.length; i++) {
    if (existingCollectionsNames.includes(collectionsToSeed[i]))
      await db.collection(collectionsToSeed[i]).drop();
  }

  await Promise.all([
    barberSchema(db),
    customerSchema(db),
    appointmentSchema(db)
  ]);

  const barbers = await db.collection('barbersx').insertMany([
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

  const customers = await db.collection('customersx').insertMany([
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
  ]);

  await db.collection('appointmentsx').insertMany([
    {
      barberId: selectRandomId(barbers),
      customerId: selectRandomId(customers),
      date: new Date('October 3, 2018 12:30:00')
    },
    {
      barberId: selectRandomId(barbers),
      customerId: selectRandomId(customers),
      date: new Date('October 3, 2018 13:30:00')
    },
    {
      barberId: selectRandomId(barbers),
      customerId: selectRandomId(customers),
      date: new Date('October 3, 2018 14:30:00')
    },
    {
      barberId: selectRandomId(barbers),
      customerId: selectRandomId(customers),
      date: new Date('October 3, 2018 15:30:00')
    },
    {
      barberId: selectRandomId(barbers),
      customerId: selectRandomId(customers),
      date: new Date('October 3, 2018 10:30:00')
    },
    {
      barberId: selectRandomId(barbers),
      customerId: selectRandomId(customers),
      date: new Date('October 3, 2018 11:30:00')
    }
  ]);
};

// Connect to DB and run seed function;
const { MongoClient } = require('mongodb');
const url = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}${
  process.env.URL
}`;
const dbName = process.env.DATABASE_NAME;

const initializeDb = async (err, client) => {
  assert.equal(null, err);
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  // If we were performing other operations and potential race conditions arose, then we could await this (it is an asyncrhonous function);
  try {
    await populateDb(db);
    console.log('seeded');
    process.exit(0);
  } 
  catch (error) {
    console.log(error);
    process.exit(1);
  }
};

MongoClient.connect(
  url,
  { useNewUrlParser: true },
  initializeDb
);
