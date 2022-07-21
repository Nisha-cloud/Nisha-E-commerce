const express = require("express");
const router = new express.Router()
const PP = require('../models/PP')
const ADAuth = require('../middleware/adauth')
router.post('/add', ADAuth,  async (req, res)=>{
    try{
        const pp = new PP({...req.body})
        res.status(200).send(pp)
        await pp.save()
    } catch (e) {
        res.status(500).send(e)
    }
})
//To fetch all the PPs
router.get('/get', async (req, res)=>{
    try {
        const result = await PP.find({})
        res.status(200).send(result)
    } catch (e) {
        res.status(500).send(e)
    }
})

//TO GET BY ID
router.get('/getbyid/:id', async(req,res) => {
  try {
    const getPP = await PP.find({_id:req.params.id})
    return res.status(200).json(getPP)
} catch (error) {
    console.log(error)
    return res.status(500).json({msg:error.message})
}
    
})

// to update the PP by its id
router.patch("/Update/:id", ADAuth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["description"];
    const isvalidUpdate = updates.every((update) =>
      allowedUpdates.includes(update)
    );
    if (!isvalidUpdate) {
      res.status(400).send({ Error: "not a valid Update" });
    }
    try {
      const  pp = await PP.findOne({
        _id: req.params.id
      });
      if (!pp) {
        return res.status(404).send(e);
      }
      updates.forEach((update) => (pp[update] = req.body[update]));
      await pp.save();
      res.status(201).send(pp);
    } catch (e) {
      res.status(400).send();
    }
  });


// to delete the given PP by its id
router.delete('/delete/:id', ADAuth , async (req, res)=>{
try {
    const deletepp = await PP.findOneAndDelete({_id: req.params.id})
res.status(200).json({ 
    msg: "the deleted PPs are ",
     data:  deletepp})
} catch(e){
    res.status(500).send(e)
}
})

module.exports = router