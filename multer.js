const { Module } = require('module')
var multer = require('multer')
const path = require('path')
//category img upload
var storage2 = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'public/Category')
    },
    filename: function(req,file,cb){
        cb(null, 'Category'+'-'+Date.now() + path.extname(file.originalname))
    }
})

var storage3 = multer.diskStorage({destination:function(req,file,cb){
    cb(null,'public/Productimg')
},
filename: function(req,file,cb){
    cb(null, 'Product'+'-'+Date.now() + path.extname(file.originalname))
}
})



var storage4 = multer.diskStorage({destination:function(req,file,cb){
    cb(null,'public/Admin')
},
filename: function(req,file,cb){
    cb(null, 'Admin'+'-'+Date.now() + path.extname(file.originalname))
}
})


var storage5 = multer.diskStorage({destination:function(req,file,cb){
    cb(null,'public/Bannerimg')
},
filename: function(req,file,cb){
    cb(null, 'Banner'+'-'+Date.now() + path.extname(file.originalname))
}
})

module.exports ={
    upload_Category:multer({storage: storage2}),
    upload_Product:multer({storage: storage3}),
    upload_Admin:multer({storage: storage4}),
    upload_Banner:multer({storage: storage5})
}