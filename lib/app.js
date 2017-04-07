const schnoodles = require('./routes/schnoodles');
const express = require('express');
const app = express();
const morgan = require('morgan');
app.use(morgan('dev'))


app.use('/schnoodles', schnoodles);

module.exports = app;