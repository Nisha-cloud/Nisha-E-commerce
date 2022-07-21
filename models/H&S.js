const mongoose = require("mongoose")

const HSSchema = new mongoose.Schema({ 
    name: { 

        type: String,
        required: true
    },
    email: {
        type:String,
        // unique:true
    },
    mobile:{
        type:String,
        required:[true,"Please provide mobile number"]
    },
    query: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref:"User"
    }

},
{
    timestamps : true
})


module.exports = mongoose.model("HandS", HSSchema)