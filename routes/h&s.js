const express = require("express");
const router = new express.Router()
const HS = require('../models/H&S')
const Auth = require('../middleware/auth')
const ADAuth = require('../middleware/adauth')
router.post('/add', Auth,  async (req, res)=>{
    try{
        const hs = new HS({...req.body,
        user: req.user.id})
     const result =    await hs.save()

        res.status(200).send(result)
    } catch (e) {
        res.status(500).send(e)
    }
})
//To get all the HSs of user
router.get('/get', Auth, async (req, res)=>{
    try {
        const result = await HS.find({user:req.user.id})
        res.status(200).send(result)
    } catch (e) {
        res.status(500).send(e)
    }
})

//TO GET HS OF A  PARTICULAR USER BY ADMIN
router.get('/getall', ADAuth ,async(req,res) => {
  try {
    const getHS = await HS.find({}).populate('user')
    return res.status(200).json(getHS)
} catch (error) {
    console.log(error)
    return res.status(500).json({msg:error.message})
}
    
})

// // to update the HS by its id
// router.patch("/Update/:id", Auth, async (req, res) => {
//     const updates = Object.keys(req.body);
//     const allowedUpdates = ["description"];
//     const isvalidUpdate = updates.every((update) =>
//       allowedUpdates.includes(update)
//     );
//     if (!isvalidUpdate) {
//       res.status(400).send({ Error: "not a valid Update" });
//     }
//     try {
//       const  hs = await HS.findOne({
//         _id: req.params.id
//       });
//       if (!hs) {
//         return res.status(404).send(e);
//       }
//       updates.forEach((update) => (hs[update] = req.body[update]));
//       await hs.save();
//       res.status(201).send(hs);
//     } catch (e) {
//       res.status(400).send();
//     }
//   });


// to delete the given HS by its id
// router.delete('/delete/:id', Auth , async (req, res)=>{
// try {
//     const deletehs = await HS.findOneAndDelete({_id: req.params.id})
// res.status(200).json({ 
//     msg: "the deleted HSs are ",
//      data:  deletehs})
// } catch(e){
//     res.status(500).send(e)
// }
// })

module.exports = router