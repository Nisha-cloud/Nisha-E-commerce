const mongoose = require('mongoose');
const otpSchema = new mongoose.Schema({
    mobile:{
        type:String,
        required:[true,"Please provide mobile number"],
       
    },
    otp:{
        type: String,
        required:[true,"please provide an otp"]
    },
    password:{

        type: String
    },
    createdAt:{
        type:Date,
        default: Date.now,
        index:{expires: 300}
    }
})
// otpSchema.statics.findByCredentials = async (mobilenumber, password) => {
//     try {
//         const user = await usermodelotp.findOne({ mobilenumber: mobilenumber })
//         if (!user) {
//             throw new Error('No such user')
//         }
//         // const isMatch = bcrypt.compare(password, user.password)
//         // if (!isMatch) {
//         //     throw new Error('Wrong Password')

//         // }
//         return user
//     } catch (error) {
//         console.log('Unable to login', error)
//     }
// }


module.exports = mongoose.model('Otp',otpSchema)