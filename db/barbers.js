// Validation rules using JSON schema for our collection of barbers in MongoDB;
const barberSchema = (db) => db.createCollection('barbersx', {
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
          },
          description: {
            bsonType: 'string',
            description: 'must be a string'
          },
          isBarber: {
            bsonType: 'bool',
            description: 'must be a boolean'
          }
        }
      }
    }
  });

module.exports = barberSchema;

// // Examples of querying the collection of barbers;
// db.collection('barbers')
//   .find() // This will return a cursor object;
//   .toArray() // The toArray() method returns an array that contains all the documents from a cursor;
//              // The method completely iterates through the cursor, loading all the documents into RAM and exhausting the cursor;

// db.collection('barbers')
//   .findOne({ _id: ObjectId(barberId) }) // We have to cast the barberId from a string to a MongoDB objectId data type for proper lookup;
//   .toArray()
