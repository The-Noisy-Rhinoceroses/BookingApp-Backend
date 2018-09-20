// schema
db.createCollection('barbers', {
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        required: ['firstName', 'lastName', 'phoneNumber', 'email'],
        properties: {
          firstName: {
            bsonType: 'string',
            description: 'must be a string and is required'
          },
          lastName: {
            bsonType: 'string',
            description: 'must be a string and is required'
          },
          phoneNumber: {
            bsonType: 'string',
            description: 'must be a string and is required'
          },
          email: {
            bsonType: 'string',
            pattern: '^.+@.+$',
            description:
              'must be a string and match the regular expression pattern'
          },
          imgUrl: {
              bsonType: 'string',
              description: 'must be a string'
          }
        }
      }
    }
  });
