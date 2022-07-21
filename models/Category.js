const mongoose = require('mongoose')
const categorySchema = new mongoose.Schema({
    category: {
        required: true,
        type: String
    },
    categoryimg: {
        type: String,
        required: true
    }
},
{
    timestamps:true
})
module.exports = mongoose.model("Category", categorySchema)