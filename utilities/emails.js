const nodemailer = require('nodemailer');
const moment = require('moment');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.BOOKING_APP_EMAIL_ACCOUNT,
    pass: process.env.BOOKING_APP_PASSWORD
  }
});

const getResponse = function(error, info) {
  error ? console.log(error) : console.log('Email sent: ' + info.response);
};

const sendEmail = function(customer) {
  const mailOptions = {
    from: process.env.BOOKING_APP_EMAIL_ACCOUNT,
    to: customer.email,
    subject: 'Confirmation from BookingApp: You set up an appointment!',
    text: `Hello ${customer.firstName} ${customer.lastName}!\nYou are receiving this e-mail as a friendly reminder that you set up an appointment on our platform for ${moment(customer.appointmentDate).format("dddd, MMMM Do YYYY, h:mm a")}!\nBest, The Team at BookingApp`
  };

  transporter.sendMail(mailOptions, getResponse);
};

module.exports = sendEmail;
