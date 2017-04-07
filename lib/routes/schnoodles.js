const bodyParser = require('body-parser').json();
const Schnoodle = require('../models/schnoodles');
const router = require('express').Router();

router
    .post('/', bodyParser, (req, res, next) => {
        new Schnoodle(req.body).save()
            .then(schnoodle => res.send(schnoodle))
            .catch(next);
    })
    .get('/', (req, res, next) => {
        //list all schnoodles
    })
    .get('/:id', (req, res, next) => {
        //return single schnoodle by id
    })
    .put('/:id', bodyParser, (req, res, next) => {
        //updated specified schnoodle by id
    })
    .delete('/:id', (req, res, next) => {
        //delete specific schnoodle by id
    })