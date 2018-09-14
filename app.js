require('./secrets');

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const barbersRouter = require("./routes/barbers");
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = `mongodb://${process.env.MONGO_USER}:${
  process.env.MONGO_PASSWORD
}${process.env.URL}`;

// Database Name
const dbName = 'barbershop';

// Use connect method to connect to the server
MongoClient.connect(
  url,
  function(err, client) {
    assert.equal(null, err);
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    app.use("/barbers", barbersRouter(db));
  }
);

module.exports = app;
