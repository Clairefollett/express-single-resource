const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const assert = chai.assert;
const app = require('../lib/app');

chai.use(chaiHttp);

process.env.DB_URL = 'mongodb://localhost:27017/express-single-resource-test';
require('../lib/connection');

describe('schnoodle routes', () => {
    const request = chai.request(app);

    //making some test schnoodles
    let breezy = {
        name: 'breezy',
        type: 'schnoodle', 
        age: 5.5
    }
    //making some test schnoodles
    let princess = {
        name: 'princess',
        type: 'schnoodle', 
        age: 5
    }

    before(() => mongoose.connection.dropDatabase());

    function saveSchnoodle(schnoodle) {
        return request.post('/schnoodles')
            .send(schnoodle)
            .then(res => 
            schnoodle = res.body);
    }

    it('posts a new schnoodle', () => {
        return saveSchnoodle(breezy)
            .then(res => {
                res._id = breezy._id
                assert.deepEqual(res._id, breezy._id);
            })
    })
})