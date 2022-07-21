const express = require("express");
const router = new express.Router()
const Product = require('../models/Product')
const ADAuth = require('../middleware/adauth')
// const Auth = require('../middleware/Auth')
// const sellerauth = require('../middleware/sellerauth')

// app.post('/', upload.array('multi-files'), (req, res) => {
//   res.redirect('/');
// });

const {upload_Product}= require("../multer");
const {addProduct,
getProduct,
getbyid,
deleteall,
deletebyid,
getrandom} = require('../controller/productcntlr')

  

router.post('/add', ADAuth, upload_Product.array('product_images', 10), addProduct)
router.get("/get/product", getProduct);
router.get('/get/:id',  getbyid)
router.delete('/deletebyid/:id',ADAuth, deletebyid)
router.delete('/deleteall',ADAuth, deleteall)

// to get recomended for you
router.get('/getrandom', getrandom)



module.exports = router