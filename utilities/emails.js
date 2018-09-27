const nodemailer = require('nodemailer');
const moment = require('moment');

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
  const mailOptions = {
    from: process.env.BOOKING_APP_EMAIL_ACCOUNT,
    to: customer.email,
    subject: 'Haircut Appointment Confirmation From Rezi!',
    text: `Hello, ${customer.firstName} ${customer.lastName}!\n\nYou are receiving this e-mail as a friendly reminder that you set up an appointment on Rezi for ${moment(customer.appointmentDate).format("dddd, MMMM Do YYYY, h:mm a")} with our barber ${barber.barberFirstName} ${barber.barberLastName}!\n\nBest, The Team at Rezi`
  };

  transporter.sendMail(mailOptions, getResponse);
};

module.exports = sendEmail;
