const reviewSchema = db =>
  db.createCollection('reviews', {
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        required: ['rating', 'body', 'customerId', 'barberId'],
        properties: {
          rating: {
            bsonType: 'int',
            description: 'must be a number and is required'
          },
          body: {
            bsonType: 'string',
            description: 'must be a string and is required'
          },
          customerId: {
            bsonType: 'objectId',
            description: 'must be a ObjectId and is required'
          },
          barberId: {
            bsonType: 'objectId',
            description: 'must be a ObjectId and is required'
          }
        }
      }
    }
  });

module.exports = reviewSchema;
