const mongoose = require('mongoose');
const otpSchema = new mongoose.Schema({
    mobile:{
        type:String,
        required:[true,"Please provide mobile number"]
    },
    otp:{
        type: String,
        required:[true,"please provide an otp"]
    },
    createdAt:{
        type:Date,
        default: Date.now,
        index:{expires: 300}
    }
})


module.exports = mongoose.model('Otp',otpSchema);