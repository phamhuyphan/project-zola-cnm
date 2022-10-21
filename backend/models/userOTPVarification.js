const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserVerificationSchema = new Schema({
    userId: String,
    otp: String,
    time: { type: Date, default: Date.now, index: { expires: 60} }
})

const UserVerification = mongoose.model("UserVerification", UserVerificationSchema)

module.exports = UserVerification