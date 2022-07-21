const mongoose = require("mongoose")

const TCSchema = new mongoose.Schema({ 
    description: { 

        type: String,
        required: true
    }

})

module.exports = mongoose.model("TandC", TCSchema)