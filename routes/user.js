const express = require('express')
const router = new express.Router()
const User = require('../models/User')
const Auth = require('../middleware/auth')

// const config = require('../config')
const { update } = require('../models/User')
const usermodelotp = require('./usermodelotp')
//to sign up through email and password

const accountSid = 'ACf014d4eff53c167479a07b97851b05bd'
const authtoken = '0544de84142a35d736c055e8a305b278'
const serviceID = "VA27d93af94cb9ca5474844d951182905e"


const client = require('twilio')(accountSid, authtoken)

router.get('/get', async (req, res) => {


    const result = await User.find({})

    res.send(result)
})
//LOGIN INTO ACCOUNT
router.post('/login', async (req, res) => {
    try {
       const user = await User.findByCredentials(req.body.mobile, req.body.password)

console.log(req.body.mobile)
console.log(req.body.password)

       // if verified true = token
       if(user.isVerified == true){
       const token = await user.generateAuthToken()
       res.status(201).json({token: token})
    }
    else{
        res.status(500).json({message:"Please signup"})
    }
        }
        

    
    catch (e) {
        res.status(400).json({message: "Unable to login"})
    }
})
//TO READ SELF INFORMATION
router.get('/me', Auth, async (req, res) => {

    console.log(req.user)
    try {

        const nisha = await User.findById(req.user.id)
        res.status(201).send(nisha)



    } catch (e) {

        res.status(500).send(e)
    }


    //     try {
    // const users = await User.find({})
    // res.status(201).send(users)
    //     } catch (error) {
    // res.status(500).send(error)
    //     }
})
// User.find({}).then((users) => {
// res.send(users)
// }).catch((e) => {
//     res.status(500).send()
// })
// })



// router.get('/users/:id', async (req, res) => {
//     const_id = req.params.id
//     try {
//         const user = await User.findById(const_id)
//         if (!user) {
//             return res.status(404).send(
//         }
//         res.send(user)
//     } catch (error) {
//         res.status(500).send()

//     }
// })
//TO UPDATE SELF INFORMATION
router.patch('/updateme', Auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['password']
    const isvalidUpdate = updates.every((update) => {
        return allowedUpdates.includes(update)
    })
    if (!isvalidUpdate) {
        res.status(400).json({ message: "Invalid Update" })
    }
    try {
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user)

    } catch (error) {
        res.status(400).send(error)
    }

})

//TO LOGOUT FROM CURRENT DEVICES
router.post('/logout', Auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send()
    }
})

// TO LOGOUT FROM ALL DEVICES
router.post('/logoutAll', Auth, async (req, res) => {
    try {
        console.log(req.user)
        req.user.tokens = []
        await req.user.save()
        res.json({message: "Logout successfully"})
    } catch (error) {
        res.status(500).send(error)
    }
})
//TO DELETE USER
router.delete('/deleteme', Auth, async (req, res) => {
    try {
        // const user = await User.findByIdAndDelete(req.params.id)
        await req.user.remove()
        res.status(200).send(req.user)
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