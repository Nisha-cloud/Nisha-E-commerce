const express = require('express')
const router = new express.Router()
const Seller = require('../models/Seller')
const SLAuth = require('../middleware/sellerauth')
const multer = require('multer')
const sharp = require('sharp')
const buffer = require('buffer')


const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(png|jpg|jpeg)$/)){
            return cb(new Error('Please upload a valid img extension'))
        }
        cb(undefined,true)
    }
})

//TO UPLOAD PROFILE PICTURE
router.post('/picadd', SLAuth, upload.single('avatar'), async(req,res) => {
    console.log(req.file)
    const buffer = await sharp(req.file.buffer).resize({width:230, height:230}).png().toBuffer()
    req.seller.avatar = buffer
    console.log(req.seller)
    await req.seller.save()
    res.send('Profile picture uploaded successfully')

},
(error,req,res,next) => {
    res.status(400).send({error:error.message})
}
)
//TO SEE THE AVATAR
router.get('/avatar', SLAuth, async(req,res) => {
    try{
        const seller = await Seller.findById(req.seller.id)
        if(!seller || !seller.avatar){
            throw new Error()
        }
        res.set('Content-Type','image/png')
        res.send(seller.avatar)

    }
    catch(e){
        res.status(400).send(e)
    }
})
//TO REMOVE AVATAR
router.delete('/removeavatar', SLAuth, async(req,res) => {
    try{
        req.seller.avatar = undefined
        await req.seller.save()
        res.status(200).send('Profile picture deleted successfully')
    }
    catch(e){
        res.status(500).send(e)
    }
})
//TO CREATE SELLER
router.post('/createseller', async(req,res) => {
    const seller =  new Seller({...req.body})
  try {
    // console.log(seller)
         await seller.save()
          const token = await seller.generateAuthToken()
  

    //   res.status(201).send({seller,token})
    res.status(201).json({token:token})
      // console.log(token)
  } catch (error) {
      res.status(500).send(error)
  }
})

//TO LOGIN INTO ACCOUNT
router.post('/sellerlogin', async (req, res) => {
    try {
       const seller = await Seller.findByCredentials(req.body.email, req.body.password)
       const token = await seller.generateAuthToken()
    //   res.status(200).send({seller, token})
    res.json({token: token})
        }
        




    
    catch (e) {
        res.status(400).send(e)
    }
})


//GET SELLER 
router.get('/sellerme',SLAuth, async (req, res) => {


    const result = await Seller.find({})

    res.send(result)
})

//UPDATE SELLER 
router.patch('/updateme', SLAuth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'mobile']
    const isvalidUpdate = updates.every((update) => {
        return allowedUpdates.includes(update)
    })
    if (!isvalidUpdate) {
        res.status(400).send({ Error: 'Invalid Update' })
    }
    try {
        updates.forEach((update) => req.seller[update] = req.body[update])
        await req.seller.save()
        res.send(req.seller)

    } catch (error) {
        res.status(400).send(error)
    }

})

//TO LOGOUT FROM CURRENT DEVICES
router.post('/logout', SLAuth, async (req, res) => {
    try {
        req.seller.tokens = req.seller.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.seller.save()
        res.send()
    } catch (error) {
        res.status(500).send()
    }
})

// TO LOGOUT FROM ALL DEVICES
router.post('/logoutAll', SLAuth, async (req, res) => {
    try {
        console.log(req.seller)
        req.seller.tokens = []
        await req.seller.save()
        res.send('Logout successfully')
    } catch (error) {
        res.status(500).send(error)
    }
})

//TO DELETE SELLER
router.delete('/deleteme', SLAuth, async (req, res) => {
    try {
        // const user = await User.findByIdAndDelete(req.params.id)
        await req.seller.remove()
        res.status(200).send(req.seller)
        // if(!user){
        //     return res.status(404).send(user)
        // }


        // await req.user.remove()
        // res.send(req.user)
    }
    catch (error) {
        res.status(500).send(error)

    }
})

module.exports = router