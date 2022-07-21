const mongoose = require('mongoose')
const bannerSchema = new mongoose.Schema({
    bannername: {
        required: true,
        type: String
    },
    bannerimg: {
        type: String,
        required: true
    }
},
{
    timestamps:true
})
module.exports = mongoose.model("Banner", bannerSchema)