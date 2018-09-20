// schema
db.createCollection('appointments', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['customerId', 'barberId', 'date'],
      properties: {
        customerId: {
          bsonType: 'string',
          description: 'must be a string and is required'
        },
        barberId: {
          bsonType: 'string',
          description: 'must be a string and is required'
        },  
        date: {
          bsonType: 'date',
          description: 'must be a date and is required'
        }
      }
    }
  }
});

// example
db.appointments.insertOne({
  customerId: '1',
  barberId: '1',
  date: new Date('September 20, 2018 17:30:00')
});

db.appointments.find({
  date: {
    $gte: new Date('September 20, 2018 00:00:00'),
    $lt: new Date('September 21, 2018 00:00:00')
  }
});
