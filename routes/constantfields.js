const express = require('express')
const ADAuth = require('../middleware/adauth')
const{ newConstantfields,
    getfieldsproducts,
    removetopdealproduct} = require('../controller/constantfieldscntrl')

// const{addCategory} = require('../controller/categorycntrl')
const router = new express.Router()


// const{upload_Category} = require('../multer')

// console.log(getCategory)
// console.log(addCategory)


router.post('/add/constantfield', ADAuth,  newConstantfields)
router.get('/getfields/:id', getfieldsproducts)
router.delete('/delete/:id', ADAuth, removetopdealproduct)
module.exports = router