const mongoose = require('mongoose')
const constantfieldsSchema = new mongoose.Schema({
    NAME: {
        required: true,
        type: String
    },
//     categoryimg: {
//         type: String,
//         required: true
//     }
},
{
    timestamps:true
})
module.exports = mongoose.model("constantfields", constantfieldsSchema)