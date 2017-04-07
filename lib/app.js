const schnoodles = require('./routes/schnoodles');
const express = require('express');
const app = express();

app.use('/', schnoodles);
app.use('/schnoodles', schnoodles);

module.exports = app;