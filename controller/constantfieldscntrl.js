// const { findById, findOne } = require('../models/Admin')
const constantfields = require('../models/Constantfields')

const Product = require('../models/Product')
// var ObjectId = require('mongodb').ObjectId



exports.newConstantfields = async(req,res) => {
  try{
   
    const newfield = new constantfields({
        
       NAME: req.body.NAME

        
    })

  await newfield.save()
  res.status(200).send(newfield)

    
  }
      catch(error){
        return res.status(400).json({message:'Something went wrong'})
        }
    
}





exports.getfieldsproducts = async(req, res)=>{
  console.log(req.params.id)

  try{

    const result = await Product.find({TOP_DEALS:req.params.id})
    console.log(result)
    res.status(201).send(result)

  }catch(e){

    res.status(500).send(e)
  }
}

exports.removetopdealproduct = async(req,res) => {
  try {
    const deletetopdealprod = await Product.findByIdAndRemove({
      _id: req.params.id
    });
    console.log(req.params.id)
    return res.status(200).json({ msg: "Top deal product deleted successfully" ,data:  deletetopdealprod});
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
  };
