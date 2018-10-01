const nodemailer = require('nodemailer');
const moment = require('moment');
const ical = require('ical-generator');
const cal = ical({domain: 'gmail.com'});

// Provide details about email address, password, and e-mailing platform;
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.BOOKING_APP_EMAIL_ACCOUNT,
    pass: process.env.BOOKING_APP_PASSWORD
  }
});

// Print a confirmation or rejection message regarding whether or not the email was sent;
const getResponse = (error, info) => {
  error ? console.log(error) : console.log('Email sent: ' + info.response);
};

// Fill out the content of the email and send it to the customer;
const sendEmail = (customer, barber) => {
  const event = cal.createEvent({
    start: moment(customer.appointmentDate),
    end: moment(customer.appointmentDate).add(30, 'minutes'),
    organizer: 'Rezi <bookingapplication718@gmail.com>',
    summary: 'SUMMARY',
    description: 'DESCRIPTION'
  });
  const attendee = event.createAttendee({
    email: customer.email,
    name: `${customer.firstName} ${customer.lastName}`,
    rsvp: 'true',
    status: 'TENTATIVE'
  });
  const mailOptions = {
    from: process.env.BOOKING_APP_EMAIL_ACCOUNT,
    to: customer.email,
    subject: 'Haircut Appointment Confirmation From Rezi!',
    text: `Hello, ${customer.firstName} ${
      customer.lastName
    }!\n\nYou are receiving this e-mail as a friendly reminder that you set up an appointment on Rezi for ${moment(
      customer.appointmentDate
    ).format('dddd, MMMM Do YYYY, h:mm a')} with our barber ${
      barber.barberFirstName
    } ${barber.barberLastName}!\n\nBest, The Team at Rezi`,
    icalEvent: {
      content: cal.toString(),
      method: 'request'
    }
  };

  transporter.sendMail(mailOptions, getResponse);
};

module.exports = sendEmail;
