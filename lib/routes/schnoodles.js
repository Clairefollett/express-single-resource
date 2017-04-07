const Schnoodle = require('../models/schnoodles');
const Router = require('express').Router;
const router = Router();


function parseBody(req) {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', data => body += data);
        req.on('error', err => reject(err));
        req.on('end', () => {
            const schnoodle = JSON.parse(body);
            resolve(schnoodle);
        });
    });
};

router
    .get('/', (req, res, next) => {
        const query = {};
        if(req.query.type) {
            query.type = req.query.type;
        }
        Schnoodle.find(query)
            .then(schnoodles => res.send(schnoodles))
            .catch(next);
    })
    .post('/', (req, res, next) => {
        parseBody(req)
            .then(body => {
                return new Schnoodle(body).save()
            })
            .then(schnoodle => res.send(schnoodle))
            .catch(next);
    })
    .get('/:id', (req, res, next) => {
        Schnoodle.findById(req.params.id)
            .then(schnoodle => res.send(schnoodle))
            .catch(next);
    })
    .put('/:id', (req, res, next) => {
        parseBody(req)
            .then(schnoodle => {
                return Schnoodle.findByIdAndUpdate(
                    req.params.id,
                    schnoodle,
                    { new: true, runValidators: true}  
                );
            })
            .then(schnoodle => {
                res.send(schnoodle);
            })
            .catch(next);
    })
    // .delete('/:id', (req, res, next) => {
    //     //delete specific schnoodle by id
    // })
module.exports = router;