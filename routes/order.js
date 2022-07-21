const express = require("express");
const router = express.Router();
const Auth = require('../middleware/auth')


const{
checkout,
placeOrder,
getOrders,
clearorder
} = require("../controller/ordercntrl");

// const Auth = require('../middleware/Auth')
router.post("/checkout", Auth, checkout);
router.post("/place-order", Auth, placeOrder);
router.get("/getorders", Auth, getOrders)
router.delete("/delete",Auth, clearorder)

module.exports = router;