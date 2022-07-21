require('dotenv').config();
const createError = require('http-errors');
const otpGenerator = require('otp-generator');
const jwt = require('jsonwebtoken');
// const geoip = require('geoip-lite');
// const User = require('../models/User')
const bcrypt = require('bcrypt');
const acsid = process.env.TWILIO_ACCOUNT_SID
const authtoken = process.env.AUTH_TOKEN

const JWT_SECRET = "5868"

console.log("acsid")
const client = require('twilio')('AC00fa8a173ba16ddca47a87618f1d938c', '9801132d08263dd026bafeb7adde36be');


console.log("acsidnffbnc")


const Otp = require('./routes/usermodelotp');
const User = require('./models/User');
const { constants } = require('buffer');

exports.sendOtpToUser = async (req, res, next) => {

    try {



        const amnumber = req.body.mobile
        const dhoond = await User.findOne({ mobile: amnumber })
        console.log("yyyyy" + dhoond)
        if (dhoond) {



            if (dhoond.isVerified === false) {

                await User.findOneAndDelete({ mobile: amnumber })

                const { mobile } = req.body


                const otp = otpGenerator.generate(4, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });

                const receiver = `+91${mobile}`;
                console.log(receiver)
                const salt = await bcrypt.genSalt(10);
                const otpHash = await bcrypt.hash(otp, salt);




                const otpToSend = await Otp.create({
                    mobile,
                    otp: otpHash

                })


                const user = new User({ mobile: req.body.mobile, password: req.body.pswd2 })
                // const salty = await bcrypt.genSalt(10)
                // const password = await bcrypt.hash(pswd2, salty)
                console.log(user)
                user.save()

                // res.status(200).send({
                //     otp,
                //     // otpToSend,

                // })



                await res.status(200).json({
                    message: "Mobile number already registered",
                    otp,
                    otpToSend,
                })




            }
            else if(dhoond.isVerified === true){
                res.status(200).json({
                    message:"Already registered please sign in"
                })
            }
        }
        // console.log("entered")
        if (!dhoond) {
            const { mobile } = req.body
            const pswd1 = req.body.pswd1
            const pswd2 = req.body.pswd2
            if (pswd1 != pswd2) {
                return res.status(501).json({ message: "Password did not match" })
            }

            const otp = otpGenerator.generate(4, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });

            const receiver = `+91${mobile}`;
            console.log(receiver)
            const salt = await bcrypt.genSalt(10);
            const otpHash = await bcrypt.hash(otp, salt);




            // const msg = await client.messages.create({
            //     body: `Your one time password is ${otp}`,
            //     from: '+18647219189',
            //     to: receiver
            // })

            const otpToSend = await Otp.create({
                mobile,
                otp: otpHash

            })


            const user = new User({ mobile: req.body.mobile, password: req.body.pswd2 })
            // const salty = await bcrypt.genSalt(10)
            // const password = await bcrypt.hash(pswd2, salty)
            console.log(user)
            user.save()

            res.status(200).send({
                otp,
                otpToSend,

            })

        }
    }
    // else {


    //     res.status(500).json({
    //         message: "Mobile number already registered"
    //     })


    // }
    catch (error) {
        console.log(error);
        return next(error)
    }


}



exports.verifyOtpAndSaveUser = async (req, res, next) => {

    console.log("aniket")
    // const User = this
    try {
        const { otpEnterByUser, mobile } = req.body;
        const otp = await Otp.find({ mobile: mobile });
        const requiredOtp = otp[otp.length - 1];  /// latest otp
        if (!otp) return next(createError(400, 'You used an expired otp'))
        const otpHash = requiredOtp.otp;
        console.log("line1")

        console.log(otpHash)
        console.log(otpEnterByUser)
        const verifyOtp = await bcrypt.compare(otpEnterByUser, otpHash);
        if (verifyOtp) {
            /// if user exists then directly send the jwt token else save the user and send the jwt
            const userProvidingOtpExists = await User.findOne({ mobile: mobile })
            // console.log(user)
            // console.log(User.isVerified)
            console.log(userProvidingOtpExists)
            if (userProvidingOtpExists) {
                // const user = new User(req.body.isVerified == true)
                userProvidingOtpExists.isVerified = true
                // user.save()
                // const user = new User.findById(req.params.id)
                // console.log(user)
                console.log("line2")

                const token = jwt.sign({
                    payload: userProvidingOtpExists._id,
                }, JWT_SECRET, { expiresIn: '2d' });
                userProvidingOtpExists.save()

                return res.status(200).json({
                    data: userProvidingOtpExists,
                    token: token
                })

            } else {

                console.log("line3")

                const newUser = await User.create({
                    mobile,
                    password: req.body.password
                });
                const token = jwt.sign({
                    payload: newUser._id,
                }, JWT_SECRET, { expiresIn: '2d' });
                if (newUser) {
                    return res.status(201).json({
                        newUser,
                        token
                    })
                }
            }
        } else {

            console.log("line33")

            return next(createError(400, 'otp is not correct'))
        }

    } catch (error) {
        console.log(error);
        return next(error);
    }

}

// exports.getLiveLocation = async (req, res, next) => {
//     try {
//         const ip = req.ip;

//         const geo = await geoip.lookup(ip);
//         if (geo) {
//             res.status(200).json({
//                 geo
//             })
//         } else {
//             return next(createError(404, 'cannot get the live location'))
//         }

//     } catch (error) {
//         return res.json({
//             error
//         })
//     }


// }

// exports.updateUserDetails = async (req, res, next) => {
//     try {
//         // const user = await User.findById(req.user);
//         // console.log(user);

//         const { fullName, shopName, address, liveLocation, email, shopType } = req.body;
//         const updateBody = {
//             fullName,
//             shopName,
//             address,
//             liveLocation,
//             email,
//             shopType
//         }

//         // console.log(updateBody);
//         const user = await User.findByIdAndUpdate(req.user, updateBody, { new: true });
//         if (user) {
//             return res.status(200).json({
//                 user
//             })
//         } else {
//             return next(createError(400, "cannot update the data Please try again"))
//         }

//     } catch (error) {
//         console.log(error);
//     }

// }

// exports.authMiddleware = async (req, res, next) => {
//     if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer')) return next(createError(401, 'unauthorized access'))

//     const token = req.headers.authorization.split(" ")[1];
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     const loggedInUser = await User.findOne({ _id: decoded.payload });

//     if (!loggedInUser) return next(createError(404, 'User not found'));

//     req.user = decoded.payload;

//     next();

// }

// exports.me = async (req, res) => {
//     try {
//         const me = await User.findById(req.user);
//         return res.status(200).json({
//             me
//         });
//     } catch (error) {
//         console.log(error);
//     }
// }