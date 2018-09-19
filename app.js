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

// Use connect method to connect to the server
MongoClient.connect(
  url,
  function(err, client) {
    assert.equal(null, err);
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    app.use('/api', indexRouter(db));
  }
);

module.exports = app;
