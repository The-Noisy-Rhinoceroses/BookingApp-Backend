// Grab environment variables;
require('./secrets');

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const assert = require('assert');

const indexRouter = require('./routes/index');
const app = express();

// Middleware;
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Create a new MongoClient instance;
const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}${process.env.URL}`;

// Database Name
const dbName = process.env.DATABASE_NAME;

// The first parameter will contain the Error object if an error occurred, or null otherwise
// The second parameter will contain the initialized database object, or null if an error occurred
const initializeDb = function(err, client) {
  assert.equal(null, err);
  console.log('Connected successfully to server');

  const db = client.db(dbName);
  app.use('/api', indexRouter(db));
};

// Connect the instance of MongoClient to MongoDB via the connection URL
MongoClient.connect(url, { useNewUrlParser: true }, initializeDb);

module.exports = app;
