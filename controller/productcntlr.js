const Product = require('../models/Product')




exports.addProduct = async (req, res) => {

  let addImage = [];
  if(req.files && req.files.length){
    addImage = req.files.map((image) => {
      return image.path
    })
  }


  const newproduct = new Product({
      title: req.body.title,
      description:req.body.description,
      price: req.body.price,
      productimg:addImage,
      // seller: req.params.id,
      // subcategory: req.body.subcategory,
      category: req.body.category,
      constant_fields:req.body.constant_fields
  })
  newproduct.save((error, data) => {
      console.log(newproduct,data)
      if (error) {
        return res.status(400).json({
          message: "Something went wrong",
          error:error
        });
      }
      if (data) {
        return res.status(201).json({
          product:data
        });
      }
    });
  }

  exports.getProduct = async (req, res) => {
try{
    const result = await Product.find({})
if(result){
    res.status(200).send(result)
} else{
   res.status(500).send("No Such product found")
}
}catch (error) {
    res.status(500).send(error)
}
  }



  exports.getbyid = async (req, res) => {
    try{
        const result  = await Product.find({_id : req.params.id})
        res.status(200).send(result)
        
    } catch (error) {
        res.status(500).send(error)
    }
  }



  exports.deletebyid = async (req, res) => {
    try{
        const result = await Product.deleteOne({_id: req.params.id})
        res.status(200).send(result)
    }catch (error) {
        res.status(500).send(error)
    }
  }



  exports.deleteall = async (req, res) => {
    try{
        const result = await Product.deleteMany({})
        res.status(200).send(result)
    } catch (error) {
        res.status(500).send(error)
    }
  }


  // db.yourCollection.find().limit(-1).skip(yourRandomNumber).next()
  exports.getrandom = async(req, res)=>{


    console.log("qwertyuio")
    try{

// to get random product recommended for you
 const result = await Product.find().skip(1)
 console.log(result)

    }catch (e){

      res.status(500).send(e)
    }
  }



