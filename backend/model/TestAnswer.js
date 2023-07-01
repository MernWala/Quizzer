const mongoose = require('mongoose');
const { Schema } = mongoose;

const TestAnswerSchema = new Schema({
    questionId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        unique: true
    },
    answer: {
        type: Array,
        require: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = TestAnswerSchema;