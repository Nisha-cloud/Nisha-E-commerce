
const cart = require('../models/Cart');
const ObjectId  = require("mongoose").Types;

function runUpdate(condition, updateData) {
  return new Promise((resolve, reject) => {
    cart.findOneAndUpdate(condition, updateData, { upsert: true })
      .then((result) => resolve())
      .catch((err) => reject(err));
  });
}
 
exports.addToCart = async(payload) => {
    // console.log(payload)
try{
   let result = await cart.findOne({user:payload.user})
   if (!result){
    result = new cart({
      user:payload.user,
      quantity:payload.quantity
    })
   }
   const product = payload.product
  



   const productIndex = result.products.findIndex((cartProduct) => {
     return cartProduct.product.toString() === product;
   })

   if(productIndex < 0){
    result.products.push({product});
   } else {
    result.products[productIndex].quantity += 1;
   }
   await result.save()
   if(result){
    return{
      status:200,
      success:true,
      data:result,
      message:"Add Cart Successfully"
    }
   }else{
    return{
      success:false,
      status:400,
      message:"Something Went Wrong"
    }
   }
 

}catch (error){
console.log(error)
throw error
}
}

exports.getCart = async() => {
  try{
    result = await cart.find({})
        if(result){
            return{
                success:true,
                status:200,
                data:result,
                message:"Get Succefully"
               }
               }else{
               return {
                success:false,
                status:400,
                message:"Something went Wrong"
            }
        }  
     }catch (error) {
       console.log(error);
    throw error
  }
  }


  exports.increase = async(userId)=>{

    try{
      let result = await cart.find({user:userId})
      .populate('products.product')

      // console.log("the result is " + result)
      console.log("the result is in qntty" + result.products.product.quantity)

      if (result) {
        return {
          success: true,
          data:result,
          code: 200,
          message: 'the product quantity'
           }
    } else {
        return {
            success: false,
          code: 404,
          error: 'Record Not Found!!!'
        }
    }



    }catch (e){


    }
  }

exports.getSingleUserCart = async(userId) =>{
  try{
     let result = await cart.findOne({user:userId})
     .populate("products.product")
        if (result) {
            return {
              success: true,
              data:result,
              code: 200,
              message: 'the users product'
               }
        } else {
            return {
                success: false,
              code: 404,
              error: 'Record Not Found!!!'
            }
        }

  }catch (error){
    throw error
  }
}


//to remove the single item from the cart

exports.deleteCartItem = async(  userId, _id)=>{
  console.log(_id)
  console.log(userId)
  try{
    let result = cart.updateOne({userid:userId}, { $pull:{ products : {productid: _id} }}, {multi: true})
if (result){
  return {
    success: true,
    data:result,
    code: 200,
    message: 'Successfully Deleted'
     }
} else {
  return {
      success: false,
    code: 404,
    error: 'No Record Found!!!'
  }
}

  } catch (error){
    throw error
  }
}









// to clear the whole cart by user id
exports.emptycart = async(_id)=>{
  try{
    let result = await cart.findOne({id:_id})
result.products = undefined
await result.save() 
    if (result) {
      return {
        success: true,
        data:result,
        code: 200,
        message: 'Successfully Deleted'
         }
  } else {
      return {
          success: false,
        code: 404,
        error: 'No Record Found!!!'
      }
  }
  } catch (error){
    throw error
  }
}