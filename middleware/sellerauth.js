const jwt = require('jsonwebtoken')
const Seller = require('../models/Seller')
const SLAuth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ' ,'')
        console.log(token)
        const decoded = jwt.verify(token, process.env.SLToken_key)
        console.log(decoded)
        const seller = await Seller.findOne({ _id: decoded._id, "tokens.token": token })
        if (!seller) {
            throw new Error()
            console.log(Error)
        }
        else {
            req.seller = seller
            next()
        }
    }
    catch (e) {
        next()
    }
}
module.exports = SLAuth