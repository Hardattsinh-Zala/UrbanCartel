const {Schema, model} = require("mongoose");

const otpSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: Number,
        required: true,
    },
    expireAt: {
        type: Date,
        default: () => new Date(Date.now() + 5*60*1000),
        index: {expires: 0}
    }
});

const Otp = new model("Otp", otpSchema);
module.exports = Otp;