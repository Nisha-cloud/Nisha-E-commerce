const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const AdminSchema = new mongoose.Schema(
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
            unique: true
        },
        password:
        {
            type: String,
            required: true

        },
        avatar: 
        {
            type: Buffer
        },
        tokens: [
            {
                token: {
                    type: String,
                    required: true
                }
            }
        ],
        
    },
    {
        timestamps : true
    },

)
    AdminSchema.methods.generateAuthToken = async function () {
        const admin = this
        // console.log(user)
        const token = jwt.sign({ _id: admin._id }, process.env.Token_keyy )
        // console.log(token)
        admin.tokens = admin.tokens.concat({ token })
        await admin.save()
        return token
    },

    AdminSchema.statics.findByCredentials = async (email, password) => {
        const admin = await Admin.findOne({ email: email })
        
            
            if (!admin) {
                throw new Error('No such admin')
            }
            const isMatch = await  bcrypt.compare(password, admin.password)
            if (!isMatch) {
                throw new Error('Wrong Password')
    
            }
            // const result = password.localeCompare(admin.password)
            // if(result!= 0){
            //     throw new Error('Wrong Password')
            // }
           
            return admin
            
            
        } 
    
    AdminSchema.pre('save', async function (next) {
        const admin = this
        if (admin.isModified('password')) {
            admin.password =  await bcrypt.hash(admin.password, 8)
        }
        next()
    })
    

const Admin = mongoose.model('Admin', AdminSchema)

module.exports = Admin ;