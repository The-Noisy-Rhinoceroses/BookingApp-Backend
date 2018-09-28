// Validation rules using JSON schema for our collection of appointments in MongoDB;
const appointmentSchema = (db) => db.createCollection('appointments', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['customerId', 'barberId', 'date'],
      properties: {
        customerId: {
          bsonType: 'objectId',
          description: 'must be an objectId and is required'
        },
        barberId: {
          bsonType: 'objectId',
          description: 'must be an objectId and is required'
        },
        date: {
          bsonType: 'date',
          description: 'must be a date and is required'
        }
      }
    }
  }
});

module.exports = appointmentSchema;

// Examples of querying the collection of appointments;
// db.appointments.find({
//   date: {
//     $gte: new Date('September 20, 2018 00:00:00'), // We must cast the string into a Date object for proper lookup;
//     $lt: new Date('September 21, 2018 00:00:00')
//   }
// });

// db.appointments.insertOne({
//   customerId: '1', // ObjectId();
//   barberId: '1', // ObjectId();
//   date: new Date('September 20, 2018 17:30:00')
// });
