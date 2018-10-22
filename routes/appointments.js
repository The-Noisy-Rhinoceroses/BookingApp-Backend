const express = require('express');
const router = express.Router();
const moment = require('moment');
const { ObjectId, Double } = require('mongodb');
const { getAppointmentsByDay, getAppointmentsByTimePeriod } = require('../utilities/queries');
const sendEmail = require('../utilities/emails');
const adder = require('../utilities/adder');
const retrieveServices = require('../utilities/retrieveServices');

const appointmentRouter = db => {
  router.get('/day', (req, res, next) => {
    const { date } = req.query;
    let formattedDate = moment(date, 'MM-DD-YYYY');
    getAppointmentsByDay(db, formattedDate)
      .then(appointments => res.status(200).json(appointments))
      .catch(next);
  });

  router.get('/week', (req, res, next) => {
    const { date } = req.query;
    getAppointmentsByTimePeriod(db, date, 'week')
      .then(appointments => res.status(200).json(appointments))
      .catch(next);
  });

  router.get('/month', (req, res, next) => {
    const { date } = req.query;
    getAppointmentsByTimePeriod(db, date, 'month')
      .then(appointments => res.status(200).json(appointments))
      .catch(next);
  });

  router.post('/', async (req, res, next) => {
    const {
      barberId,
      appointmentDate,
      customerId,
      email,
      firstName,
      lastName,
      barberFirstName,
      barberLastName,
      selectedServices
    } = req.body;

    const objectBarberId = ObjectId(barberId);
    const date = new Date(appointmentDate);
    const objectCustomerId = ObjectId(customerId);

    const customer = {firstName, lastName, email, appointmentDate};
    const barber = {barberFirstName, barberLastName};

    const selectedServicesNames = Object.keys(selectedServices);
    let actualServices;

    try {
      actualServices = await retrieveServices(db, selectedServicesNames);
    } catch (error) {
      console.log(error);
    }

    const totalPrice = Double(adder(actualServices, 'price'));
    const totalDuration = adder(actualServices, 'duration');

    db.collection('appointments')
      .insertOne({
        barberId: objectBarberId,
        date,
        selectedServices: selectedServicesNames,
        customerId: objectCustomerId,
        totalPrice,
        totalDuration
      })
      .then(() => {
        res.sendStatus(201);
        sendEmail(customer, barber);
      })
      .catch(next);
  });

  router.delete('/:appointmentId', (req, res, next) => {
    const { appointmentId } = req.params;
    db.collection('appointments')
      .deleteOne({ _id: ObjectId(appointmentId) })
      .then(() => res.status(200).send());
  });

  return router;
};

module.exports = appointmentRouter;
