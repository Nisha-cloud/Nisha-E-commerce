const express = require("express")
const app = express()
const path = require('path')



const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({ extended: true }));
// const router = require('router')
// const twilio = require("twilio")
// router.route('/verifyOtp').post(verifyOtpAndSaveUser);
const userRoute = require('./routes/user')
const addressRoute = require('./routes/address')
// const sellerRoute = require('./routes/product')
const adminRoute = require('./routes/admin')
const sellerroute = require('./routes/seller')
const categoryRoute = require('./routes/category')
// const Category = require('./routes/category')
const productRoute = require('./routes/product')
const cartRoute = require('./routes/cart')
const bannerRoute = require('./routes/banner')
const FieldRoute = require('./routes/constantfields')
const orderRoute = require('./routes/order')
const Wishlist = require('./routes/wishlistroute')
const privacypolicy = require('./routes/pp')
const otp = require('./userotproute')
const tncRoute = require('./routes/tandc')
 const handsRoute = require('./routes/h&s')

const dotenv = require("dotenv")
dotenv.config()
const mongoose = require('mongoose')
mongoose.connect(process.env.mongodb_URL).then(() => {
    console.log('DB connection successful')
}).catch((error) => {
    console.log(error)
})

const cors = require('cors')

const port = process.env.PORT || 5000
app.use(express.json())
app.use("/public", express.static(path.join(__dirname, "public")));
app.use(cors())
app.use('/userroute', userRoute)
app.use('/addaddress', addressRoute)
// app.use('/createsellerproduct', sellerRoute)
app.use('/adminroute', adminRoute)
// app.use('/sellerroute', sellerroute)
app.use('/category', categoryRoute)
app.use('/otp', otp)
app.use('/product', productRoute)
app.use('/cart', cartRoute)
app.use('/banner', bannerRoute)
// app.use('/cat', Category )
app.use('/constantfield', FieldRoute)
app.use('/order', orderRoute)
app.use('/wishlist', Wishlist)
app.use('/privacypolicy', privacypolicy)
app.use('/tnc', tncRoute)
app.use('/hns', handsRoute)


app.listen(port, () => {
    console.log('server is up on the ' + port)
})







// ACf014d4eff53c167479a07b97851b05bd - sid

// 0544de84142a35d736c055e8a305b278- token

// VA27d93af94cb9ca5474844d951182905e service sid