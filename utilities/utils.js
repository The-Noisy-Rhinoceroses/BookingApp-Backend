const moment = require('moment');

// Query for the appointments on a given day;
const getAppointmentsByDay = (db, formattedDate) => {
  return db.collection('appointments')
    .find({
      date: {
        $gte: new Date(formattedDate.format()),
        $lt: new Date(formattedDate.add(1, 'day').format())
      }
    })
    .toArray()
};

// Query for the appointments within a given week or month;
const getAppointmentsByTimePeriod = (db, date, timePeriod) => {
  let startDate = moment(date, 'MM-DD-YYYY').startOf(timePeriod);
  let endDate = moment(date, 'MM-DD-YYYY').endOf(timePeriod);

  return db.collection('appointments')
    .find({
      date: {
        $gte: new Date(startDate.format()),
        $lt: new Date(endDate.format())
      }
    })
    .toArray()
};

module.exports = {
  getAppointmentsByDay,
  getAppointmentsByTimePeriod
};
