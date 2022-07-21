const express = require('express')
const router = new express.Router()
const Address = require('../models/Address')
const Auth = require('../middleware/auth')
// const { remove } = require('../models/User')
//ADD ADDRESS
router.post('/me/address', Auth, async (req, res) => {
    const address = new Address(req.body)
    try {
        await address.save()
        res.status(201).send('Address saved successfully')
    } catch (error) {
        res.status(400).send(error)

    }

})
// READ THE ADDRESSES OF ALL USERS
router.get('/me/addresses', Auth, async (req, res) => {
    try {
        const addresses = await Address.find({})
        res.status(201).send(addresses)
    } catch (error) {
        res.status(400).send(error)
    }
})
// READ ADDRESS OF A  USER BY ID
// router.get('/address/:id', async (req, res) => {
//     const_id = req.params.id
//     try {
//         const address = await Address.findById(const_id)
//         if (!address) {
//             return res.status(404).send()
//         }
//         res.send(address)
    // } catch (error) {
    //     res.status(500).send()

    // }
// })
//UPDATE THE ADDRESS OF A USER
// router.patch('me/address' , async(req,res) => {
//     const updates = Object.keys(req.body)
//     const allowedUpdates = ['addresstype', 'housenumber', 'street', 'Phone', 'pincode', 'city', 'area', 'landmark', 'country', 'state']
//     const isvalidUpdate = updates.every((update) => {
//         return allowedUpdates.includes(update)
//     })
//     if(!isvalidUpdate){
//         res.status(400).send({Error: 'Not a valid update'})
//     }
//     try {
//         updates.forEach((update) => req.user[update] = req.body[update])
//         await req.user.save()
//         res.send(req.user)
//     } catch (error) {
//         res.status(400).send(error)
//     }
// })
//TO UPDATE ADDRESS 
// router.patch('/me/address', Auth, async (req, res) => {
// const address = Address(req.body)
//     try {

//         // const updates = Object.keys(req.body)
//     await address.save()
//     res.status(201).send('Address updated successfully')

       
//     } catch (error) {
//         res.status(501).send('Invalid update')
//     }
// })
//TO UPDATE ADDRESS
router.patch('/me/address', Auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['addresstype','housenumber', 'street', 'area' , 'landmark', 'city', 'state', 'country', 'pincode', 'phone']
    const isvalidUpdate = updates.every((update) => {
        return allowedUpdates.includes(update)
    })
    if(!isvalidUpdate){
        res.status(404).send({Error: 'Invalid Update'})
    }
    try {
        updates.forEach((update) => req.user.address[update] = req.body[update])
        await req.user.address.save()
        res.send(req.user.address)
        
    } catch (error) {
        res.status(404).send(error)
    }
   
})
//TO DELETE GIVEN ADDRESS
router.delete('/remove/:id', Auth, async (req, res) => {
   const removeAddress = await Address.findOneAndDelete({
    _id: req.params.id
   })
   try {
    if(!removeAddress){
        res.status(404).send('Not found')
    }
    res.status(201).send(removeAddress)
   } catch (error) {
    res.status(500).send(error)
   }
})

module.exports = router