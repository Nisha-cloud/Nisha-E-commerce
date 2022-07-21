const express = require('express')
const router = express.Router();
const webhookController = require("../controller/webhookctrl");
router.post("/razorpay", webhookController.rzrpaywebhook);
module.exports = router;