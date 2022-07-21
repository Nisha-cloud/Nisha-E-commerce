const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const SellerSchema = new mongoose.Schema(
    {
        name:
        {
            type: String,
            required: true,
            // unique: true
        },
        email:
        {
            type: String,
            required: true,
            // unique: true
        },
        password:
        {
            type: String,
            required: true

        },
        isAdmin: {
            type: Boolean,
            default: false
        },
        mobile: {
            type: Number,
            required: true,
            // unique: true
        },
        avatar: {
            type: Buffer
        },
        tokens: [
            {
                token: {
                    type: String
                }
            }
        ],
        
    },
    {
        timestamps : true
    }
)




SellerSchema.methods.generateAuthToken = async function () {
    const seller = this
    // console.log(user)
    const token = jwt.sign({ _id: seller._id }, process.env.SLToken_key)
    // console.log(token)
    seller.tokens = seller.tokens.concat({ token })
    await seller.save()
    return token
}




SellerSchema.statics.findByCredentials = async (email, password) => {
    const seller = await Seller.findOne({ email: email })
    
        
        if (!seller) {
            throw new Error('No such seller')
        }
        const isMatch = await  bcrypt.compare(password, seller.password)
        if (!isMatch) {
            throw new Error('Wrong Password')

        }
        // const result = password.localeCompare(admin.password)
        // if(result!= 0){
        //     throw new Error('Wrong Password')
        // }
       
        return seller
        
        
    } 
    SellerSchema.pre('save', async function (next) {
        const seller = this
        if (seller.isModified('password')) {
            seller.password =  await bcrypt.hash(seller.password, 8)
        }
        next()
    })


const Seller = mongoose.model('Seller', SellerSchema)

module.exports = Seller ;