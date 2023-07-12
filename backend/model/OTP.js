const mongoose = require('mongoose');
const { Schema } = mongoose;

const OTPSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: Number,
        require: true,
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const otp = mongoose.model('OTP verifier', OTPSchema);
otp.createIndexes();

module.exports = otp;