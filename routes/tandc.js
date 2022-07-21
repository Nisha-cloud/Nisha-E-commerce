const express = require("express");
const router = new express.Router()
const TC = require('../models/T&C')
const ADAuth = require('../middleware/adauth')
router.post('/add', ADAuth,  async (req, res)=>{
    try{
        const tc = new TC({...req.body})
        res.status(200).send(tc)
        await tc.save()
    } catch (e) {
        res.status(500).send(e)
    }
})
//To fetch all the TCs
router.get('/get', async (req, res)=>{
    try {
        const result = await TC.find({})
        res.status(200).send(result)
    } catch (e) {
        res.status(500).send(e)
    }
})

//TO GET BY ID
router.get('/getbyid/:id', async(req,res) => {
  try {
    const getTC = await TC.find({_id:req.params.id})
    return res.status(200).json(getTC)
} catch (error) {
    console.log(error)
    return res.status(500).json({msg:error.message})
}
    
})

// to update the TC by its id
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
      const  tc = await TC.findOne({
        _id: req.params.id
      });
      if (!tc) {
        return res.status(404).send(e);
      }
      updates.forEach((update) => (tc[update] = req.body[update]));
      await tc.save();
      res.status(201).send(tc);
    } catch (e) {
      res.status(400).send();
    }
  });


// to delete the given TC by its id
router.delete('/delete/:id', ADAuth , async (req, res)=>{
try {
    const deletetc = await TC.findOneAndDelete({_id: req.params.id})
res.status(200).json({ 
    msg: "the deleted TCs are ",
     data:  deletetc})
} catch(e){
    res.status(500).send(e)
}
})

module.exports = router