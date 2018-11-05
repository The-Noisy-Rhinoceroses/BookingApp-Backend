require('../secrets');

// Module dependencies;
const barberSchema = require('../db/barbers');
const customerSchema = require('../db/customers');
const appointmentSchema = require('../db/appointments');
const serviceSchema = require('../db/services');
const reviewSchema = require('../db/reviews');
const { ObjectId, Double } = require('mongodb');
const assert = require('assert');
const { generateSalt, encryptPassword } = require('./hashing');

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

  const existingCollectionsNames = existingCollections.reduce(
    (obj, currCol) => {
      obj[currCol.s.name] = true;
      return obj;
    },
    {}
  );

  const collectionsToSeed = [
    'barbers',
    'appointments',
    'customers',
    'services',
    'reviews'
  ]; // TODO: Remove tail "x";

  for (let i = 0; i < collectionsToSeed.length; i++) {
    let collectionName = collectionsToSeed[i];
    if (existingCollectionsNames.hasOwnProperty(collectionName)) {
      await db.collection(collectionName).drop();
    }
  }

  await Promise.all([
    barberSchema(db),
    customerSchema(db),
    appointmentSchema(db),
    serviceSchema(db),
    reviewSchema(db)
  ]);

  const salt = generateSalt();
  const encryptedPassword = encryptPassword('howdy', salt);

  const barbers = await db.collection('barbers').insertMany([
    {
      firstName: 'Richard',
      lastName: 'Lanchez',
      phoneNumber: phoneNumberGenerator(),
      email: 'rick@lmao.com',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sodales, eros non elementum iaculis, nisi metus fermentum elit, eget bibendum nulla turpis vestibulum urna. Integer ut magna eu urna mattis.',
      imgUrl:
        'https://images.pexels.com/photos/897270/pexels-photo-897270.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350',
      isBarber: true,
      password: encryptedPassword,
      salt
    },
    {
      firstName: 'Daniel Castillo',
      lastName: 'Man',
      phoneNumber: phoneNumberGenerator(),
      email: 'dan@lmao.com',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sodales, eros non elementum iaculis, nisi metus fermentum elit, eget bibendum nulla turpis vestibulum urna. Integer ut magna eu urna mattis.',
      imgUrl:
        'https://images.pexels.com/photos/1453006/pexels-photo-1453006.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350',
      isBarber: true,
      password: encryptedPassword,
      salt
    },
    {
      firstName: 'Manjun',
      lastName: 'Hui',
      phoneNumber: phoneNumberGenerator(),
      email: 'john@lmao.com',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sodales, eros non elementum iaculis, nisi metus fermentum elit, eget bibendum nulla turpis vestibulum urna. Integer ut magna eu urna mattis.',
      imgUrl:
        'https://images.pexels.com/photos/668196/pexels-photo-668196.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350',
      isBarber: true,
      password: encryptedPassword,
      salt
    },
    {
      firstName: 'Allan',
      lastName: 'Lapid',
      phoneNumber: phoneNumberGenerator(),
      email: 'allan@lmao.com',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sodales, eros non elementum iaculis, nisi metus fermentum elit, eget bibendum nulla turpis vestibulum urna. Integer ut magna eu urna mattis.',
      imgUrl:
        'https://images.unsplash.com/photo-1534297635766-a262cdcb8ee4?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=36efcf4bc04a4325d07e59b6d6c39d85&auto=format&fit=crop&w=1050&q=80',
      isBarber: true,
      password: encryptedPassword,
      salt
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
  ]);

  await db.collection('appointments').insertMany([
    {
      barberId: selectRandomId(barbers),
      customerId: selectRandomId(customers),
      date: new Date('November 30, 2018 12:30:00'),
      totalDuration: 30,
      totalPrice: Double(24.0),
      selectedServices: ['Regular Cut', 'Brow Cleaner add-on']
    },
    {
      barberId: selectRandomId(barbers),
      customerId: selectRandomId(customers),
      date: new Date('November 30, 2018 13:30:00'),
      totalDuration: 30,
      totalPrice: Double(24.0),
      selectedServices: ['Regular Cut', 'Brow Cleaner add-on']
    },
    {
      barberId: selectRandomId(barbers),
      customerId: selectRandomId(customers),
      date: new Date('November 30, 2018 14:30:00'),
      totalDuration: 30,
      totalPrice: Double(24.0),
      selectedServices: ['Regular Cut', 'Brow Cleaner add-on']
    },
    {
      barberId: selectRandomId(barbers),
      customerId: selectRandomId(customers),
      date: new Date('November 30, 2018 15:30:00'),
      totalDuration: 30,
      totalPrice: Double(24.0),
      selectedServices: ['Regular Cut', 'Brow Cleaner add-on']
    },
    {
      barberId: selectRandomId(barbers),
      customerId: selectRandomId(customers),
      date: new Date('November 30, 2018 10:30:00'),
      totalDuration: 30,
      totalPrice: Double(24.0),
      selectedServices: ['Regular Cut', 'Brow Cleaner add-on']
    },
    {
      barberId: selectRandomId(barbers),
      customerId: selectRandomId(customers),
      date: new Date('November 30, 2018 11:30:00'),
      totalDuration: 30,
      totalPrice: Double(24.0),
      selectedServices: ['Regular Cut', 'Brow Cleaner add-on']
    }
  ]);

  await db.collection('services').insertMany([
    {
      serviceName: 'Fade and Beard',
      duration: 50,
      price: Double(28.0),
      description:
        'Advanced cut with creative, gradual fading of the hair. Choice of style on the top of the head. Shape up included.'
    },
    {
      serviceName: 'Regular Cut',
      duration: 25,
      price: Double(20.0),
      description:
        'One length on side and back of the head and one length on top, with clippers. Shape up included. Simple, clean, done right.'
    },
    {
      serviceName: 'Brow Cleaner add-on',
      duration: 5,
      price: Double(4.0),
      description:
        'Trimming, lining, and general grooming of the eyebrows. Can be added to any service. They need some love too, sleek those boys up!'
    },
    {
      serviceName: 'Beard Trim',
      duration: 10,
      price: Double(5.0),
      description:
        "Simple grooming and cleaning of the facial hair or beard. Can be added on to any service. Goatee, 'stach, chinstrap, or full beard, they need finessing too."
    },
    {
      serviceName: 'Scissor Cut',
      duration: 30,
      price: Double(28.0),
      description:
        "Service done with all or most scissor techniques. This one is for you medium to longer length style guys. Keep that hair flowin'."
    },
    {
      serviceName: 'Beard Sculpting',
      duration: 10,
      price: Double(10.0),
      description:
        'This one is for bigger, fuller beard work. Beard is sculpted, using clippers, scissors and razor. Can be added on to any service, James Harden and lumberjacks would choose this option.'
    },
    {
      serviceName: 'Faded Cut',
      duration: 40,
      price: Double(25.0),
      description:
        'Advanced cut with creative, gradual fading of the hair. Choice of style on the top of the head. Shape up included. A Fade is the Way, Bro.'
    },
    {
      serviceName: 'Hair Designs',
      duration: 30,
      price: Double(20.0),
      description:
        'In-hair design created with a combination of clippers, trimmers and razor etching. Must contact barber directly for consultation and final pricing. For the bold, the creative, and the style forward client.'
    },
    {
      serviceName: 'The Hot Towel Shave',
      duration: 25,
      price: Double(28.0),
      description:
        'Performed with a straight razor, two hot towels infused with oils, facial cleanser massage, and one cold towel to finish. A modern twist on a traditional favorite!'
    },
    {
      serviceName: 'Tapered Cut',
      duration: 35,
      price: Double(25.0),
      description:
        'Gradual Fading at the temple/sideburns and the back of the neck area. Choice of style on the top of the head. Hairline line clean up or shaping included. Best suited for you business guys!'
    },
    {
      serviceName: '24K Gold Mask Treatment',
      duration: 20,
      price: Double(10.0),
      description:
        "An anti-wrinkle, anti-toxin, and anti-acne facial mask mostly made of turmeric, honey, and gold particles. As one of the safest metals, it's easily absorbed into the skin giving it influence at a cellular level hydrating and renewing the skin. It helps reverse oxidation damage to collagen fibers, aiding in the regeneration of healthy new cells, bringing natural luster and youthful radiance to all skin types."
    },
    {
      serviceName: 'Purifying Mask Treatment',
      duration: 20,
      price: Double(10.0),
      description:
        'An activated charcoal peel-off mask that removes blackheads, dirt, and oil ensuring skin to feel soft and silk smooth. It calms any irritations and minimizes pores leaving your face healthy, clean, fresh, and beautiful'
    },
    {
      serviceName: 'The Little Rascal Cut',
      duration: 30,
      price: Double(15.0),
      description: "Children's cut, ages 12 and under."
    },
    {
      serviceName: 'Skin Fade Cut',
      duration: 45,
      price: Double(25.0),
      description:
        'Fade that begins bald and blends into the desired length of hair on the sides or top. Choice of style on top of the head. Front hairline clean up included. Our cleanest look, and our specialty.'
    },
    {
      serviceName: 'Senior Rascal',
      duration: 30,
      price: Double(15.0),
      description: 'Senior Citizen cut 55+'
    },
    {
      serviceName: 'The Dapper Rascal Cut',
      duration: 50,
      price: Double(30.0),
      description:
        "Choice of specialty cut. Two hot towels on face and neck, ending with shampoo and styling. This an an upgraded service, experience the difference why don't you?"
    },
    {
      serviceName: 'The Line-Up',
      duration: 15,
      price: Double(8.0),
      description:
        'Cleaning and defining of the hairline with trimmer and straight razor. We do it crisp and smooth, like your swag.'
    },
    {
      serviceName: 'The Royal Rascal Treatment',
      duration: 75,
      price: Double(45.0),
      description:
        'Choice of specialty haircut. Different selection of premium products. Two hot towels on face and neck with massage, ending with shampoo and styling. Black or gold mask included. Complimentary beverage. Our highest honor service, indulge yourself, you know you deserve it.'
    }
  ]);

  await db.collection('reviews').insertMany([
    {
      rating: 5,
      body: 'My time with this barber was awesome!',
      customerId: selectRandomId(customers),
      barberId: selectRandomId(barbers)
    },
    {
      rating: 4,
      body: 'My time with this barber was good!',
      customerId: selectRandomId(customers),
      barberId: selectRandomId(barbers)
    },
    {
      rating: 4,
      body: 'My time with this barber was great!',
      customerId: selectRandomId(customers),
      barberId: selectRandomId(barbers)
    },
    {
      rating: 5,
      body: 'My time with this barber was amazing!',
      customerId: selectRandomId(customers),
      barberId: selectRandomId(barbers)
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
  try {
    await populateDb(db); // Due to potential race conditions, we await this (it is an asyncrhonous function);
    console.log('seeded');
    process.exit(0);
  } catch (error) {
    console.log(error.result.result.writeErrors[0].err);
    process.exit(1);
  }
};

MongoClient.connect(
  url,
  { useNewUrlParser: true },
  initializeDb
);
