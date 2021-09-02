const express = require('express')
const router = express.Router()

const {
    smsOtp,
    verifyOtp,
    registerUser,
    logOut,
    refresh
} = require('../controllers/authControllers.js')

const { 
    authenticateToken, 
    validateMobile, 
    validateRegisteration, 
    validateOtp
} = require('../middleware/middleware.js')

router.post('/sms-otp', validateMobile, smsOtp)
router.post('/verify-otp', validateMobile, validateOtp, verifyOtp)
router.post('/register', validateMobile, validateRegisteration, registerUser)
router.get('/logout', authenticateToken, logOut)
router.get('/refresh', authenticateToken, refresh)

module.exports = router
