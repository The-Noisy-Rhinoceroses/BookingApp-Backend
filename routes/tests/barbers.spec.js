require('../../secrets');
const { expect } = require('chai');
const assert = require('assert');
const request = require('supertest');
const app = require('../../app');
const http = require('http');
const { MongoClient } = require('mongodb');
const apiRouter = require('../index')

const url = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}${process.env.TEST_URL}`;
const dbName = `${process.env.DATABASE_NAME}-test`;

const initializeDb = (err, client) => {
    assert.equal(null, err);
    const db = client.db(dbName);
    app.use('/api', apiRouter(db));
}

describe('barber routes', () => {
    let server;
    beforeEach(async () => {
        // app.set('port', 1337)
        await MongoClient.connect(url, { useNewUrlParser: true }, initializeDb);
        server = http.createServer(app);
        server.listen(1337);
    });
    afterEach(() => {
        server.close()
    })
    // after(() => {
    //     process.exit(0)
    // })
    it('GET /api/barbers', (done) => {
        request(server).get('/api/barbers').expect(200, done);
    })
})
