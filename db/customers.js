// Validation rules using JSON schema for our collection of customers in MongoDB;
const customerSchema = (db) => db.createCollection('customersx', {
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
        }
      }
    }
  }
});

module.exports = customerSchema;

// // Examples of querying the collection of customers;
// db.collection('customers')
//   .deleteOne({ _id: ObjectId(customerId) }) // We have to cast the customerId from a string to a MongoDB objectId data type for proper lookup;

// db.collection('customers')
//   .updateOne({ _id: ObjectId(customerId) }, { $set: { firstName, lastName, phoneNumber, email } }) // Find a particular customer by objectId and update the specific properties passed;
//                                                                                                    // See "Operators ---> Update Operators ---> Field Update Operators" in the MongoDB documentation;
