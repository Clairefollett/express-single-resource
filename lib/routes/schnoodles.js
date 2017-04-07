const bodyParser = require('body-parser').json();
const Schnoodle = require('../models/schnoodles');
const router = require('express').Router();

router
    .post('/', (req, res, next) => {

    })
    .get('/', (req, res, next) => {
        //list all schnoodles
    })
    .get('/:id', (req, res, next) => {
        //return single schnoodle by id
    })
    .put('/:id', (req, res, next) => {
        //updated specified schnoodle by id
    })
    .delete('/:id', (req, res, next) => {
        //delete specific schnoodle by id
    })