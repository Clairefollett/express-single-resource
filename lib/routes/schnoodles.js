const router = require('express').Router();
const Schnoodle = require('../models/schnoodles');
const ObjectId = require('mongodb').ObjectId;

function parseBody(req) {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', data => body += data);
        req.on('error', err => reject(err));
        req.on('end', () => {
            const tool = JSON.parse(body);
            resolve(tool);
        });
    });
};

router
    .get('/schnoodles', (req, res, next) => {
        Schnoodle.find()
            .then(schnoodles => res.send(schnoodles))
            .catch(next);
    })
    .post('/schnoodles/', (req, res, next) => {
        parseBody(req)
            .then(schnoodle => {
                new Schnoodle(schnoodle).save()
                .then(schnoodle => res.send(schnoodle));
            })
            .catch(next);
    })
    // .get('/:id', (req, res, next) => {
    //     //return single schnoodle by id
    // })
    // .put('/:id', bodyParser, (req, res, next) => {
    //     //updated specified schnoodle by id
    // })
    // .delete('/:id', (req, res, next) => {
    //     //delete specific schnoodle by id
    // })
module.exports = router;