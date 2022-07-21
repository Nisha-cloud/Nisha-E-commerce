const express = require('express')
const router = new express.Router()
const ADAuth = require('../middleware/adauth')
// const Admin = require('../models/Admin')
// const ADAuth = require('../middleware/adauth')
// const multer = require('multer')
// const sharp = require('sharp')
// const buffer = require('buffer')
const{addAdmin, loginAdmin, getAdmin, getbyid, editAdmin,logoutAdmin, deleteAdmin, logoutAdminAll} = require('../controller/admincntrl')
const{upload_Admin} = require('../multer')

// const upload = multer({
//     limits: {
//         fileSize: 1000000
//     },
//     fileFilter(req,file,cb){
//         if(!file.originalname.match(/\.(png|jpg|jpeg)$/)){
//             return cb(new Error('Please upload a valid img extension'))
//         }
//         cb(undefined,true)
//     }
// })

//TO UPLOAD PROFILE PICTURE
// router.post('/picadd',ADAuth, upload.single('avatar'), async(req,res) => {
  
//     const buffer = await sharp(req.file.buffer).resize({width:230, height:230}).png().toBuffer()
//     // console.log(req.file)
//     // console.log(admin)
   


//  req.admin.avatar =buffer
//     await req.admin.save()
//     res.send('Profile picture uploaded successfully')

// },
// (error,req,res,next) => {
//     res.status(400).send({error:error.message})
// }
// )
// //TO SEE THE AVATAR
// router.get('/avatar', ADAuth, async(req,res) => {
//     try{
//         const admin = await Admin.findById(req.admin.id)
//         if(!admin || !admin.avatar){
//             throw new Error()
//         }
//         res.set('Content-Type','image/png')
//         res.send(admin.avatar)

//     }
//     catch(e){
//         res.status(400).send(e)
//     }
// })
// //TO REMOVE AVATAR
// router.delete('/removeavatar', ADAuth, async(req,res) => {
//     try{
//         req.admin.avatar = undefined
//         await req.admin.save()
//         res.status(200).send('Profile picture deleted successfully')
//     }
//     catch(e){
//         res.status(500).send(e)
//     }
// })


// //TO CREATE ADMIN
// router.post('/createadmin', async(req,res) => {
//       const admin =  new Admin(req.body)
//     try {
//         await admin.save()
//             const token = await admin.generateAuthToken()
    

//         // res.status(201).send({admin,token})
//         // console.log(token)
//         res.status(201).json({token: token})
//     } catch (error) {
//         res.status(500).send(error)
//     }
// })

// // TO LOGIN INTO ACCOUNT
// router.post('/adminlogin', async (req, res) => {
//     try {
//        const admin = await Admin.findByCredentials(req.body.email, req.body.password)
//        const token = await admin.generateAuthToken()
//     //   res.status(200).send({admin, token})
//     res.json({token: token})
//         }
        

    
//     catch (e) {
//         res.status(400).send(e)
//     }
// })
// //GET ADMIN THROUGH ID
// // router.get('/admin/:id' , async(req,res) => {
// //     const_id = req.params.id
// //     try {
// //         const admin = await Admin.findById(const_id)
// //         if(!admin){
// //            return res.status(404).send()
// //         }
// //         res.send(admin)
// //     } catch (error) {
// //        res.status(500).send(error) 
// //     }
// // })
// //ADMIN DETAILS
// // router.get('/adminme', ADAuth, async (req, res) => {
// //     try {
// //        res.send(req.admin)
// //     } catch (error) {
// //         res.status(500).json({message: message})

// //     }


// //     // const result = await Admin.find({})

// // //     res.send(result)
// // })


// router.get('/adminme',ADAuth, async (req, res) => {


//     const result = await Admin.find({})

//     res.send(result)
// })


// //UPDATE ADMIN THROUGH ID
// // router.patch('/updateadmin/:id' , async(req,res) => {
// //     try {
// //         const admin = await Admin.findByIdAndUpdate({_id:req.params.id}, {name : req.body.name})
// //         const adminupdate = await admin.save()
// //         res.status(201).send(adminupdate)
// //     } catch (error) {
// //         res.status(500).send('Invalid update')
// //     }
// // })

// router.patch('/updateadmin', ADAuth, async (req, res) => {
//     const updates = Object.keys(req.body)
//     const allowedUpdates = ['name', 'email', 'password']
//     const isvalidUpdate = updates.every((update) => {
//         return allowedUpdates.includes(update)
//     })
//     if (!isvalidUpdate) {
//         res.status(400).send({ Error: 'Invalid Update' })
//     }
//     try {
//         updates.forEach((update) => req.admin[update] = req.body[update])
//         await req.admin.save()
//         res.send(req.admin)

//     } catch (error) {
//         res.status(400).send(error)
//     }

// })
// //DELETE ADMIN
// // router.delete('/delete/:id',  async(req,res) => {
// //     try{
// //         const admin = await Admin.findByIdAndDelete({_id: req.params.id})
        
// //         if(!admin){
// //             return res.status(404).send('No admin found')
// //         } 

// //     res.status(201).send(admin)
// //     }
// //     catch(error){
// //         res.status(500).send(error)
        
// //     }
// // })
// //TO LOGOUT ADMIN FROM CURRENT DEVICES
// router.post('/logout', ADAuth, async (req, res) => {
//     try {
//         req.admin.tokens = req.admin.tokens.filter((token) => {
//             return token.token !== req.token
//         })
//         await req.admin.save()
//         res.send('Logged out from this device successfully')
//     } catch (error) {
//         res.status(500).send(error)
//     }
// })

// //LOGOUT ADMIN FROM ALL DEVICES
// router.post('/logoutAll', ADAuth, async (req, res) => {
//     try {
//         // console.log(req.user)
//         req.admin.tokens = []outer.delete('/delete/category/:id', ADAuth, deleteCategory)
//         await req.admin.save()
//         res.send('Logout successfully')
//     } catch (error) {
//         res.status(500).send(error)
router.post('/add/Admin',   upload_Admin.single('avatar'), addAdmin)
router.post('/login/Admin', loginAdmin)
router.get('/get/Admin', ADAuth, getAdmin)
router.get('/getone/:id', getbyid)
router.post('/edit/admin/:id', ADAuth, upload_Admin.single('avatar'), editAdmin)
router.post('/logout/Admin',ADAuth, logoutAdmin)

router.post('/logoutAll/Admin', ADAuth, logoutAdminAll)
router.delete('/delete/admin/:id', ADAuth, deleteAdmin)
module.exports = router