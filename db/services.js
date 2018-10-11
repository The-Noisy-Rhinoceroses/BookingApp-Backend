// Validation rules using JSON schema for our collection of services in MongoDB;
const serviceSchema = (db) => db.createCollection('services', {
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        required: ['serviceName', 'duration', 'price', 'description'],
        properties: {
            serviceName: {
            bsonType: 'string',
            description: 'must be a string and is required'
          },
          duration: {
            bsonType: 'int',
            description: 'must be a int and is required'
          },
          price: {
            bsonType: 'int',
            description: 'must be a double and is required'
          },
          description: {
            bsonType: 'string',
            description: 'must be a string and is required'
          }
        }
      }
    }
  });

  module.exports = serviceSchema;