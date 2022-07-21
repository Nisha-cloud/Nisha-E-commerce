const mongoose = require('mongoose')
const addressSchema = new mongoose.Schema(
    {
        Address : {
            addresstype : {
                type: String,
            },
            housenumber : {
                type: String,
                required : true,
            },
            street : {
                type: String,
                required: true,
            },
            area : {
                type: String,
                required: true
            },
            landmark : {
                type : String
            },
            city : {
                type: String,
                required : true
            },
            state : {
                type: String,
                required: true
            },
            country : {
                type : String,
                required : true
            },
            pincode : {
                type: String,
                required: true
            },
            phone : {
                type : String
            },
        },
    },
    {
        timestamps : true
    }
);
const Address = mongoose.model('Address', addressSchema)
module.exports = Address







    


