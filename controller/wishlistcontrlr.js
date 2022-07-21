const Wishlist = require('../models/wishlist')

exports.addproduct = async(req, res)=>{


    exports.addToCart = async(req, res) => {
        // console.log(payload)
    try{
       let result = await Wishlist.findOne({user:req.user.id})
       if (!result){
        result = new Wishlist({
          user:payload.user,
          quantity:payload.quantity
        })
       }
       const product = payload.product
      
    
    
    
       const productIndex = result.products.findIndex((WishlistProduct) => {
         return WishlistProduct.product.toString() === product;
       })
    
       if(productIndex < 0){
        result.products.push({product});
       } else {
        result.products[productIndex].quantity += 1;
       }
       await result.save()
       if(result){


        res.status(200).json({

            status:200,
            success:true,
            data:result,
            message:"Add Wishlist Successfully"
        })
       
       }else{

        res.status(400).json({
            success:false,
            status:400,
            message:"Something Went Wrong"
          })
       
       }
     
    
    }catch (error){
    console.log(error)
    res.status(500).send(error)

    }
    }
}