const mongoose = require('mongoose')
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt')
const UserSchema = new mongoose.Schema(
    {
        name:
        {
            type: String,
            // required: true,
            
        },
        mobile : 
        {
            type: String,
            // required : true,
            // unique: true
        },
        password:
        {
            type: String,
            // required: true

        },
        isVerified: {
            type: Boolean,
            default: false,

        },
        tokens: [

            {
                token: {
                    type:String
                }
            }
        ]
    },
  
    { timestamps: true })


    UserSchema.methods.toJSON = function () {


        const user =this
        const userObject = user.toObject()
      
        delete userObject.password
        delete userObject.tokens
        delete userObject.avatar
        // console.log(userObject)
      
        return userObject
      
      }

      

UserSchema.virtual('carts', {
    ref: 'cart',
    localField:'_id',
    foreignField: 'user'
})


UserSchema.methods.generateAuthToken = async function () {
    const user = this
    // console.log(user)
    const token = jwt.sign({ _id: user._id }, process.env.Token_Key)
    // console.log(token)
    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}

// UserSchema.statics.donework = async (id, mobilenumber) =>{


//     try{
// const result = await User.findByIdAndUpdate({_id: id}, {mobilenumber: mobilenumber})
// console.log(result)
//     }catch (e){


//         console.log(e)
//     }
// }

UserSchema.statics.findByCredentials = async (mobile, password) => {
    console.log("ttttt" + password)
console.log("gfmhdc" + mobile)
    try {
        const user = await User.findOne({ mobile: mobile })
        console.log(user)
        if (!user) {
            throw new Error('No such user')
        }
       if(password != user.password){
    console.log("nisha see" + user.password)
    console.log(password)



        return new error
       }
       else {

        return user

       }
    } catch (error) {
        console.log( error)
    }
}
UserSchema.pre('save', async function (next) {
    const User = this
    if (User.isModified('password')) {
        User.password = bcrypt.hash(User.password, 8)
    }
    next()
})

const User = mongoose.model('User', UserSchema)

module.exports = User;