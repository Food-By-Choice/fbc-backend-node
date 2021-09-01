const mongoose = require('mongoose');

const OTPSchema = mongoose.Schema({
    mobile : { type : String, required : true},
    otp : Number,
    timestamp : Date
})

const Otps = mongoose.model('otp', OTPSchema);
// Otps.index({"timestamp" : 1}, {expireAfterSeconds : 300}

module.exports = {
    Otps
}
