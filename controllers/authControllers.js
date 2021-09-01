const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const { Login } = require('../models/login.js');
const { Otps } = require('../models/otps.js')
const { Customer } = require('../models/customer.js');
const { Distributor } = require('../models/distributor.js');
const { DeliveryBoy } = require('../models/deliveryBoy.js');

const max = 999999
const min = 100000

const smsOtp = async(req, res) => {
    const { timestamp, mobile } = req.body; 

    try {
        const otp = Math.floor(Math.random() * (max - min + 1) + min);
        // an sms api call here
        const newOtp = new Otps({mobile, timestamp, otp})
        await newOtp.save()
        res.status(200).json({status : 1, msg : 'OTP Sent Succesfully'})
    } catch (error) {
        res.status(500).json({status : 0, msg : error.message})
    }
}

const verifyOtp = async(req, res) => {
    const { otp, mobile, timestamp } = req.body;
   
    try {
        const data = await Otps.findOne({ "mobile": mobile, "otp": otp })
        if (data) {
            await Otps.deleteMany({ "mobile": mobile })
            try {
                const logger = await Login.findOne({ "mobile": data.mobile })

                const user = {};

                switch (logger.userType) {
                    case 0:
                        user = await Customer.findOne({"mobile" : mobile, "id" : logger.id}) 
                        break;
                    case 1:
                        user = await Distributor.findOne({"mobile" : mobile, "id" : logger.id})
                        break;
                    case 2:
                        user = await DeliveryBoy.findOne({"mobile" : mobile, "id" : logger.id})
                        break;
                    default:
                        break;
                }

                const tokenData = { id : logger.id, mobile : logger.mobile, type : logger.userType }
                const accessToken = generateAccessToken(tokenData)
                const refreshToken = jwt.sign(tokenData, process.env.REFRESH_TOKEN_SECRET)
                await Login.updateOne({"id" : logger.id}, {"refreshToken" : refreshToken})

                res.cookie('refresh', refreshToken, {
                    httpOnly: true
                }).status(200).json({ 
                    status: 1, 
                    msg: `Welcome back ${user.name}`, 
                    access: accessToken, 
                    refresh: refreshToken,
                    profile : user.image
                })
            
            } catch (error) {
                res.status(200).json({ status: 1, msg: 'OTP Verified', redirect: 'REGISTER' })
            }
        } else {
            res.status(200).json({ status: 0, msg: 'Incorrect OTP' })
        }
    } catch (error) {
        res.status(500).json({ status: 0, msg: error.message })
    }
}

const registerUser = async(req, res) => {

    const { email, name, password, mobile, type } = req.body
    const uid = generateUid(type, mobile)
    const hashedPassword = await bcrypt.hash(password, 10)
    try {
        const newUser = await new Login({"id" : uid, email, mobile, "userType" : type, hashedPassword})
        newUser.save()
        switch(type){
            case 0: 
                await new Customer({"id" : uid, name : name}).save()
            break;
            case 1:
                await new Distributor({"id" : uid, name : name}).save()
            break;
            case 2:
                await new DeliveryBoy({"id" : uid, name : name}).save()
            break;
            default: break;
        }

        res.status(200).json({status : 1, msg : 'User Registered'})
    } catch (error) {
        res.status(500).json({status : 0, msg : error.message})
    }
}

const logOut = async(req, res) => {
    const user = req.user;
    try {
        await Login.updateOne({"id" : user.id}, {"refreshToken" : ''})
        res.status(200).json({status : 1, msg : "Logged Out Successfully"})
    } catch (error) {
        res.status(500).json({status : 0, msg : "Some Error Occured"})   
    }
}

const refresh = async(req, res) => {
    const user = req.user;
    try {
        const newAccessToken = generateAccessToken({ id : user.id, mobile : user.mobile, type : user.userType })
        res.status(200).json({status : 1, access : newAccessToken}) 
    } catch (error) {
        res.status(500).json({status : 0, msg : "Some Error Occured"})
    }
}

function generateUid(type, mobile){
    switch(type){
        case 0 : return 'US'+mobile;
        case 1 : return 'DI'+mobile;
        case 2 : return 'DL'+mobile;
        default : return ''
    }
}

function generateAccessToken(user){
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn : '300s' })
}

// function sendUserData(res, tokenData){
//     const accessToken = generateAccessToken(tokenData)
//     const refreshToken = jwt.sign(tokenData, process.env.REFRESH_TOKEN_SECRET)
//     new RefTokens({"token" : refreshToken}).save()
//     res.cookie('refresh', refreshToken, {
//         httpOnly : true
//     })
//     res.status(200).json({status : 1, msg : `Welcome back ${user.name}`, access : accessToken, refresh : refreshToken })
// }


module.exports = {
    smsOtp,
    verifyOtp,
    registerUser,
    logOut,
    refresh
}