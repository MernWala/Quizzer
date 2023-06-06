const mongoose = require('mongoose')
const { Schema } = mongoose;

const AskSchema = new Schema({
    emailId: {
        type: String,
        required: true,
    },
    question: {
        type: String,
        require: true
    },
    answerToMail: {
        type: Boolean,
        require: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const ask = mongoose.model('AskQuestion', AskSchema);
ask.createIndexes();

module.exports = ask;