const mongoose = require("mongoose")

const PPSchema = new mongoose.Schema({ 
    description: { 

        type: String,
        required: true
    }

})

module.exports = mongoose.model("Privacy Policy", PPSchema)