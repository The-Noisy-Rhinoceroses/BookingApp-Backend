require('../secrets');

// Module dependencies;
const barberSchema = require('../db/barbers');
const customerSchema = require('../db/customers');
const appointmentSchema = require('../db/appointments');
const { ObjectId } = require('mongodb');
const assert = require('assert');

// Helper functions to randomize data selection;
const phoneNumberGenerator = () => Math.floor(Math.random() * 10000000000).toString();
const selectRandomId = collection => ObjectId(collection.ops[Math.floor(Math.random() * collection.ops.length)]._id);

// Drop collections, create collections with validations, and then insert seed data;
const populateDb = async db => {
  const existingCollections = await db.collections();

  const existingCollectionsNames = existingCollections.reduce((obj, currCol) => {
    obj[currCol.s.name] = true;
    return obj;
  }, {});

  const collectionsToSeed = ['barbersx', 'appointmentsx', 'customersx']; // TODO: Remove tail "x";

  for (let i = 0; i < collectionsToSeed.length; i++) {
    let collectionName = collectionsToSeed[i];
    if (existingCollectionsNames.hasOwnProperty(collectionName)) {
      await db.collection(collectionName).drop();
    }
  }

  await Promise.all([
    barberSchema(db),
    customerSchema(db),
    appointmentSchema(db)
  ]);

  const barbers = await db.collection('barbersx').insertMany([
    {
      firstName: 'Richard',
      lastName: 'Lanchez',
      phoneNumber: phoneNumberGenerator(),
      email: 'rick@lmao.com',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sodales, eros non elementum iaculis, nisi metus fermentum elit, eget bibendum nulla turpis vestibulum urna. Integer ut magna eu urna mattis.',
      imgUrl: 'https://images.pexels.com/photos/897270/pexels-photo-897270.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350',
      isBarber: true
    },
    {
      firstName: 'Daniel Castillo',
      lastName: 'Man',
      phoneNumber: phoneNumberGenerator(),
      email: 'dan@lmao.com',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sodales, eros non elementum iaculis, nisi metus fermentum elit, eget bibendum nulla turpis vestibulum urna. Integer ut magna eu urna mattis.',
      imgUrl: 'https://images.pexels.com/photos/1453006/pexels-photo-1453006.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350',
      isBarber: true
    },
    {
      firstName: 'Manjun',
      lastName: 'Hui',
      phoneNumber: phoneNumberGenerator(),
      email: 'john@lmao.com',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sodales, eros non elementum iaculis, nisi metus fermentum elit, eget bibendum nulla turpis vestibulum urna. Integer ut magna eu urna mattis.',
      imgUrl: 'https://images.pexels.com/photos/668196/pexels-photo-668196.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350',
      isBarber: true
    },
    {
      firstName: 'Allan',
      lastName: 'Lapid',
      phoneNumber: phoneNumberGenerator(),
      email: 'allan@lmao.com',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sodales, eros non elementum iaculis, nisi metus fermentum elit, eget bibendum nulla turpis vestibulum urna. Integer ut magna eu urna mattis.',
      imgUrl: 'https://images.unsplash.com/photo-1534297635766-a262cdcb8ee4?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=36efcf4bc04a4325d07e59b6d6c39d85&auto=format&fit=crop&w=1050&q=80',
      isBarber: true
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
      date: new Date('October 24, 2018 12:30:00')
    },
    {
      barberId: selectRandomId(barbers),
      customerId: selectRandomId(customers),
      date: new Date('October 24, 2018 13:30:00')
    },
    {
      barberId: selectRandomId(barbers),
      customerId: selectRandomId(customers),
      date: new Date('October 24, 2018 14:30:00')
    },
    {
      barberId: selectRandomId(barbers),
      customerId: selectRandomId(customers),
      date: new Date('October 24, 2018 15:30:00')
    },
    {
      barberId: selectRandomId(barbers),
      customerId: selectRandomId(customers),
      date: new Date('October 24, 2018 10:30:00')
    },
    {
      barberId: selectRandomId(barbers),
      customerId: selectRandomId(customers),
      date: new Date('October 24, 2018 11:30:00')
    }
  ]);
};

// Connect to DB and run seed function;
const { MongoClient } = require('mongodb');
const url = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}${process.env.URL}`;
const dbName = process.env.DATABASE_NAME;

const initializeDb = async (err, client) => {
  assert.equal(null, err);
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  try {
    await populateDb(db); // Due to potential race conditions, we await this (it is an asyncrhonous function);
    console.log('seeded');
    process.exit(0);
  }
  catch (error) {
    console.log(error);
    process.exit(1);
  }
};

MongoClient.connect(url, { useNewUrlParser: true }, initializeDb);
