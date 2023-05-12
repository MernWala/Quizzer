const mongoose = require('mongoose')
const mongoUri = process.env.URI;

const connecToMongoose = () => {
    mongoose.connect(mongoUri, () => {
        console.log('Connected with backend - Quizer');
    })
}

module.exports = connecToMongoose;