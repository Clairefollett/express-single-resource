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
    };
    
    let princess = {
        name: 'princess',
        type: 'schnoodle', 
        age: 5
    };

    let caesar = {
        name: 'caesar',
        type: 'chocolate lab',
        age: 10
    };

    let updated = {
        name: 'fake',
        type: 'fake',
        age: 100
    };

    before(() => mongoose.connection.dropDatabase());

    function saveSchnoodle(schnoodle) {
        return request.post('/schnoodles')
            .send(schnoodle)
            .then(res => res.body);
    };

    it('posts a new schnoodle', () => {
        return saveSchnoodle(breezy)
            .then(savedSchnoodle => {
                assert.isOk(savedSchnoodle._id)
                breezy._id = savedSchnoodle._id;
                breezy.__v = savedSchnoodle.__v;
                assert.deepEqual(savedSchnoodle, breezy);
            });
    });

    it('gets schnoodle by id', () => {
        return request.get(`/schnoodles/${breezy._id}`)
            .then(res => {
                assert.deepEqual(res.body, breezy);
        });
    });

    it('gets all schnoodles', () => {
        return Promise.all([
            saveSchnoodle(caesar),
            saveSchnoodle(princess)
        ])
        .then(savedSchnoodle => {
            caesar = savedSchnoodle[0];
            princess = savedSchnoodle[1];
        })
        .then(() => request.get('/schnoodles'))
        .then(res => {
            const schnoodles = res.body;
            //we already saved breezy so he's the index 0
            assert.equal(res.body[0]._id, breezy._id)
            //first object in saved schnoodle array (request we sent)
            assert.equal(res.body[1]._id, caesar._id)
            //second object in saved schnoodle array (request we sent)
            assert.equal(res.body[2]._id, princess._id)
        });
    });

    it('updates schnoodle', () => {
        breezy.name = 'max'
        return request.put(`/schnoodles/${breezy._id}`)
            .send(breezy)
            .then(res => {
                const updatedSchnoodle = res.body;
                assert.equal(updatedSchnoodle.name, breezy.name)
        });
    });

    it('deletes schnoodle', () => {
        return request.del(`/schnoodles/${caesar._id}`)
            .then(res => {
                assert.isTrue(res.body.deleted);
            })
            .then(() => request.get('/schnoodles'))
            .then(res => {
                const schnoodles = res.body
                assert.equal(res.body[0]._id, breezy._id)
                assert.equal(res.body[1]._id, princess._id)
                assert.isUndefined(res.body[2])
                //chacks to see if caesar is removed out of schnoodle array when getting all   
            });
    });
});