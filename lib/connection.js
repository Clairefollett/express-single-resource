const mongoose = require('mongoose');
mongoose.Promise = Promise;

const dbUri = process.env.DB_URI || 'mongodb://localhost:27017/express-single-resource';

module.exports = mongoose.connect(dbUri);

mongoose.connection.on('connection', () => {
    console.log('you are connected');
});