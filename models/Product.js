const mongoose = require('mongoose')
const ProductSchema = new mongoose.Schema(
    {
        title:
    
        {
            type: String,
            required: true,
            unique: true
        },
        description : 
        {
            type: String,
            required: true
            
        },
        productimg : {
            type:[String],
        },
       
       
        size : 
        {
            type: Array
        },
        price: 
        {
            type: Number,
            required: true
        },
        security:
        {
            type: Number,
            // required: true
        },
        
        color : {
            type: Array
        },
        instock : 
        {
            type: Boolean,
            default: true
        },
        category : {
            type: mongoose.Schema.Types.ObjectId,
            // required: true,
            ref : "Category"


        },
      constant_fields : {
        type: mongoose.Schema.Types.ObjectId,
            ref : "constantfields",
            // required: true
        }
        
        

    },
    {
        timestamps : true
    })

module.exports = mongoose.model('Product', ProductSchema)