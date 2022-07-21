const {Schema,model} = require('mongoose');

const cartSchema = new Schema({
    user: {
         type: Schema.Types.ObjectId,
         ref: 'user',
         required: true
      },

    products: {
    type: [new Schema({
                    product: {
                        type: Schema.Types.ObjectId,
                        ref: "Product"
                    },
                    quantity: {
                        type: Number,
                        default: 1
                    }
                }, {_id: false})]
    },
   
    // coupon_applied: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'coupon'
    // }
}, { timestamps: true });


module.exports = model('cart', cartSchema);