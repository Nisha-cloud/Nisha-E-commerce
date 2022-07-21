const express = require('express');
const router = express.Router();
const { sendOtpToUser, verifyOtpAndSaveUser, } = require('./otpcontrler');

console.log("ndyudsifwseuyf")
router.route('/sendOtp').post(sendOtpToUser);
router.route('/verifyOtp').post(verifyOtpAndSaveUser);
// router.get('/liveLocation', authMiddleware, getLiveLocation);
// router.patch('/updateDetails', authMiddleware, updateUserDetails);
// router.get('/me',authMiddleware,me);

module.exports = router;