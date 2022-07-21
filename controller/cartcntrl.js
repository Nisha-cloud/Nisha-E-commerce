const cartEnt = require('../Services/cartservice');
const { Error } = require('mongoose');
exports.addToCart = async(req,res) => {
console.log(req.user)

const payload = req.body
const result = await cartEnt.addToCart({
...payload,
user:req.user

})
if(result.success){
res.status(result.status).json({
message:result.message,
success:result.success,
status:result.status,
data:result.data
})
}else{
res.status(result.status).json({
message:result.message,
success:result.success,
status:result.status
})
}
}

exports.getCart = async(req,res,) =>{
try{
let result = await cartEnt.getCart({})
if(result.success){

res.status(result.status).json({
success:result.success,
status:result.status,
data:result.data,
message:result.message

})
}else{
res.status(result.status).json({
success:result.success,
   status:result.status,
   message:result.message
})
}

}catch(error){
      console.log(error);
res.status(500).json({
message:error.message
})
}
}
exports.increase = async(req, res)=>{

  try{
 
    let userId = req.user
    let result = await cartEnt.increase(userId)

    console.log(result)


    
    if (result.success) {
      res.status(result.code).json({
          success:result.success,
          message: result.message,
          data:result.data
      })
  } else {
      res.status(result.code).json({
          success:result.success,
          message: result.error
      })
  }


  }catch (e){


  }
}
 exports.getSingleUserCart= async(req,res) => {
    try {
        //    console.log(req.user)
            let userId = req.user
            let result = await cartEnt.getSingleUserCart(userId)

           
           console.log(result)
            if (result.success) {
                res.status(result.code).json({
                    success:result.success,
                    message: result.message,
                    data:result.data
                })
            } else {
                res.status(result.code).json({
                    success:result.success,
                    message: result.error
                })
            }
        } catch (error) {
            throw error
        }
 }




// exports.updateQuantity = async (req, res, next) => {
//   try {
//     const product = req.params.id;
//     const { quantity } = req.body;
//     let cart = await Cart.findOne({
//       user: req.user._id,
//     });

//     if (!cart) {
//       cart = await createCart(req.user._id);
//     }

//     const productIndex = cart.products.findIndex((cartProduct) => {
//       return cartProduct.product.toString() == product;
//     });

//     if (productIndex < 0 && quantity > 0) {
//       cart.products.push({ product, quantity });
//     } else if (productIndex >= 0 && quantity > 0) {
//       cart.products[productIndex].quantity = quantity;
//     } else if (productIndex >= 0) {
//       cart.products.splice(productIndex, 1);
//     }

//     await cart.save();

//     const cartResponse = await getCartResponse(cart);

//     return res.status(200).json({
//       success: true,
//       msg: "cart updated",
//       cart: cartResponse,
//     });
//   } catch (error) {
//     next(error);
//   }
// };




 exports.emptycart = async(req,res) =>{
    try {
        let _id = req.params.id
        let result = await cartEnt.emptycart(_id)
        if(result.success){
            res.status(result.code).json({
                success:result.success,
                message: result.message,
                data:result.data
            })   
        }
        else {
            res.status(result.code).json({
                success:result.success,
                message: result.error
            })
        }
    } catch (error) {
        throw error
    }
 }

 exports.deleteCartItem = async(req,res) =>{
    try {
        let _id = req.params.id
        let userId = req.user.id
        console.log('hjbmnchv')
        console.log(_id)
 let result = await cartEnt.deleteCartItem(userId, _id)

 if(result.success){
    res.status(result.code).json({
        success:result.success,
        message: result.message,
        data:result.data
    })   
}
 
    res.status(result.code).json({
        success:result.success,
        message: result.error
    })

    }catch (error) {

        res.send(error)
    }
 }

 const getCartResponse = async (cart) => {
    try {
        console.log("cart",cart.products[0].product)
      await cart.populate([
        { path: "products.product", select: { reviews: 0 } },
        // { path: "coupon", select: "couponCode discount expirationDate" },
      ]);
  
    //   if (cart.coupon && moment().isAfter(cart.coupon.expirationDate, "day")) {
    //     cart.coupon = undefined;
    //     cart.save();
    //   }
      const cartResponse = cart.toObject();
      console.log("carrrt",cartResponse)
  
   
      let total = 0;
      cartResponse.products.forEach((cartProduct) => {
        cartProduct.total = cartProduct.product.price * cartProduct.quantity;
        total += cartProduct.total;
      console.log(cartProduct.product.price);

      });
  
    //   if (cartResponse.coupon) {
    //     discount = 0.01 * cart.coupon.discount * total;
    //   }
  
      cartResponse.subTotal = total;
      cartResponse.shipping = 10;
  
      return cartResponse;
    } catch (error) {
      throw error;
    }
  };