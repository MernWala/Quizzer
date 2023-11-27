const mongoose = require('mongoose');

const connecToMongoose = () => {
    mongoose.set('strictQuery', false)
    mongoose.connect(process.env.URI, () => {
        console.log('Connected with backend - Quizer');
    });
};

module.exports = connecToMongoose;