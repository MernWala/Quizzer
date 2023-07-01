const mongoose = require('mongoose');
const { Schema } = mongoose;

const TestRecordSchema = new Schema({
    date: {
        type: Date,
        default: Date.now
    },
    qSetid: {
        type: mongoose.Schema.Types.ObjectId,
        require: true
    },
    qCode: {
        type: String,
        require: true
    },
    stuId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true
    },
    record: [
        {
            questionId: {
                type: mongoose.Schema.Types.ObjectId,
                require: true
            },
            answer: {
                type: Array,
                require: true
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ],
    isSubmited: {
        type: Boolean,
        require: true
    }
});

const record = mongoose.model('test record', TestRecordSchema);
record.createIndexes();

module.exports = record;