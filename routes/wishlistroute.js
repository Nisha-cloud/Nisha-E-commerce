const express = require('express')

const router = new express.Router()
const Wishlist = require('../models/wishlist')
const Auth = require('../middleware/auth')
const ADAuth = require('../middleware/adauth')

router.post('/add/:id', Auth , async(req, res)=>{

    try {

        const got = await Wishlist.find({user:req.user.id,
        products:req.body.product})







        
        console.log(req.user.id)
        console.log(req.body.product)
// console.log(got!=[])
        if(req.body.product == undefined){





            
            const addtowishlist = new Wishlist({
                user: req.user.id,
                products: req.params.id
            })
            const result = await addtowishlist.save()
            console.log(result)
            res.status(201).json({
                message: "Added to wishlist sucessfully",
                data:result
})






        }else{
            res.status(500).send("already present")


        }
       
    }catch (e){
        res.status(500).send(e)
    }
} )


//to fetch single item of wishlist

router.get('/get/:id', async(req, res)=>{
    try{
        const result = await Wishlist.find({_id: req.params.id}).populate('products')
        res.status(200).json({message:"The details of the product are",
                                data: result})

    }catch (e){
        res.status(501).send(e)
    }
})

//TO GET ALL THE ITEMS OF WISHLIST
router.get('/getall',Auth, async(req, res)=>{

    console.log(req.user.id)
    try{

        const result = await Wishlist.find({user:req.user.id})

        console.log(result)
        res.status(200).json({data: result })

    }catch(e){
        res.status(501).send(e)
    }

    
})

//TO SEE THE WISHLIST BY ADMIN
router.get('/getallbyadmin',ADAuth, async(req, res)=>{

    // console.log(req.user.id)
    try{

        const result = await Wishlist.find({})

        

        console.log(result)
        res.status(200).json({data: result })

    }catch(e){
        res.status(501).send(e)
    }

    
})

//to delete the wishlist

router.delete('/delete', Auth , async(req, res)=>{
    try{
        const result = await Wishlist.deleteMany({user:req.user.id})

        res.status(201).json({data:result})
    }catch(e){
        res.status(501).json(e)
    }
})
 //TO DELETE ONE ITEM OF WISHLIST
router.delete('/deleteoneitem/:id', Auth,  async(req, res)=>{


    try{

        const result = await Wishlist.findByIdAndDelete({_id: req.params.id})
        console.log(result)
        res.status(200).send(result)

    }catch(e){

        res.status(501).send(e)
    }

})



module.exports = router