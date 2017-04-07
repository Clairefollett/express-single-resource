const mongoose = require('mongoose');
mongoose.Promise = Promise;

const dbUri = process.env.DB_URI || 'mongodb://localhost:27017/express-single-resource';
mongoose.connect(dbUri);

mongoose.connection.on('connected', function() {
    console.log('Mongoose connected on ', dbUri);
});

mongoose.connection.on('error', function(err) {
    console.log('Mongoose connection error ', err);
});

mongoose.connection.on('disconnected', function() {
    console.log('disconnected');
});

process.on('SIGINT', function() {
    mongoose.connection.close(function() {
        console.log('connection closed');
        process.exit(0);
    });
});