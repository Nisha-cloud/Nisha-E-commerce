const Category = require('../models/Category')
// var ObjectId = require('mongodb').ObjectId



exports.addCategory = async(req,res) => {
  try{
    // const{category} = req.body
    const categoryimg = req.file  ? req.file.filename : null
    console.log(categoryimg)
    const newCategory = new Category({
        category: req.body.category,
        categoryimg: process.env.BASE_URL+"public/Category/"+categoryimg
    })

  await newCategory.save()
  res.status(200).send(newCategory)

    
  }
      catch(error){
        return res.status(400).json({message:'Something went wrong'})
        }
    
}


exports.getCategory = async(req , res) => {
    try {
        const getCategory = await Category.find({})
        if(getCategory){

            return res.status(200).json({categories:getCategory})

        }
        else {

            res.status(400).send("something bad happened")
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg:error.message})
    }
}

exports.getbyid = async(req,res) => {
    try {
        const getCategory = await Category.find({_id:req.params.id})
        return res.status(200).json(getCategory)
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg:error.message})
    }
}

exports.editCategory = async (req, res) => {
    const { category } = req.body;
    const CategoryImg = req.file ? req.file.path : null;
try {
  const updatecat = await Category.findByIdAndUpdate({ 
    _id: req.params.id
    },
    {
     category,
    CategoryImg:"https://directtoyou.herokuapp.com/public/Category/"+CategoryImg

    }
  );
  return res.status(201).json({ msg: "Category updated successfully" ,
data: updatecat});
} catch (error) {
  return res.status(500).json({ msg: error.message });
}
};


exports.deleteCategory = async (req, res) => {
try {
  const deleteCategory = await Category.findByIdAndRemove({
    _id: req.params.id
  });
  console.log(req.params.id)
  return res.status(200).json({ msg: "Category deleted successfully" ,data:  deleteCategory});
} catch (error) {
  return res.status(500).json({ msg: error.message });
}
};

exports.deleteallcat = async (req, res) => {
try {
  const result = await Category.deleteMany({})
  if(!result){
      res.status(400).send("No product found")
  }
  res.status(201).send("All products deleted successfully")
}
catch (e){
  res.status(500).send(e)
}
};
