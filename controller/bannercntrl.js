const Banner = require('../models/Banner')
// var ObjectId = require('mongodb').ObjectId



exports.addBanner = async(req,res) => {
    try{
    const{bannername} = req.body

    const bannerimg = req.file?req.file.filename : null
    const newBanner = new Banner({
        bannername,
        bannerimg: process.env.BASE_URL+"public/Bannerimg/"+bannerimg
    })
    
  
    const result = await newBanner.save()
    res.status(200).send(result)
}

        catch(error){
            return res.status(400).json({message:'Something went wrong'})
        }
    
}


exports.getBanner = async(req , res) => {
    try {
        const getBanner = await Banner.find({}).limit(3)
        if(getBanner){

            return res.status(200).json(getBanner)

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
        const getBanner = await Banner.find({_id:req.params.id})
        return res.status(200).json(getBanner)
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg:error.message})
    }
}

exports.editBanner = async (req, res) => {
    const { bannername } = req.body;
    const bannerimg = req.file ? req.file.path : null;
try {
  const updateban = await Banner.findByIdAndUpdate({ 
    _id: req.params.id
    },
    {
     bannername,
    bannerimg:process.env.BASE_URL+"public/Bannerimg/"+bannerimg

    }
  );
  return res.status(201).json({ msg: "Banner updated successfully" ,
data: updateban});
} catch (error) {
  return res.status(500).json({ msg: error.message });
}
};


exports.deleteBanner = async (req, res) => {
try {
  const deleteBanner = await Banner.findByIdAndRemove({
    _id: req.params.id
  });
  console.log(req.params.id)
  return res.status(200).json({ msg: "Banner deleted successfully" ,data:  deleteBanner});
} catch (error) {
  return res.status(500).json({ msg: error.message });
}
};

exports.deleteallban = async (req, res) => {
try {
  const result = await Banner.deleteMany({})
  if(!result){
      res.status(400).send("No banner found")
  }
  res.status(201).send("All banners deleted successfully")
}
catch (e){
  res.status(500).send(e)
}
};



// return res.status(201).json({banner:newBanner})
// return res.status(400).json({message:'Something went wrong'})