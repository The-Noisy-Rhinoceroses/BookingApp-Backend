// Grab environment variables;
// require('./secrets');

// Module dependencies;
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const assert = require('assert');
const helmet = require('helmet');
const compression = require('compression');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
const { ObjectId } = require('mongodb');

// Instantiate our application with Express and require in our Auth Router and API Router;
const authRouter = require('./routes/auth');
const apiRouter = require('./routes/index');
const app = express();

// Middleware;
app.use(helmet())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(compression())
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Create a new MongoClient instance;
const { MongoClient } = require('mongodb');

// Connection URL;
const url = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}${process.env.URL}`;

// Database Name;
const dbName = process.env.DATABASE_NAME;

// "err" will contain an Error object if an error occurred or null if an error did not occur;
// "client" will contain the initialized database object or null if an error occurred;
const initializeDb = (err, client) => {
  assert.equal(null, err);
  console.log('Connected successfully to server');
  const db = client.db(dbName);

  app.use(session({
    secret: process.env.SESSION_SECRET,
    store: new MongoStore({db}),
    resave: false,
    saveUninitialized: false
  }));

  passport.serializeUser(function(barber, done) {
    done(null, barber._id);
  });

  passport.deserializeUser(function(id, done) {
    db.collection('barbers').findOne({ _id: ObjectId(id) })
      .then(barber => done(err, barber));
  });

  app.use(passport.initialize());
  app.use(passport.session());
  app.use('/auth', authRouter(db)); // Mount our Auth Router;
  app.use('/api', apiRouter(db)); // Mount our API Router;
};

// Connect the instance of MongoClient to MongoDB via the connection URL;
MongoClient.connect(url, { useNewUrlParser: true }, initializeDb);

// Export our app, so that it can be required in bin/www;
module.exports = app;
