const jwt = require('jsonwebtoken')

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    console.log(authHeader);
    const token = authHeader && authHeader.split(' ')[1]
    if( token == null ) return res.sendStatus(401)
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

const validateMobile = (req, res, next) => {
    const { mobile } = req.body
    if(mobile.length === 10 && /^[0-9]+$/.test(mobile)){
        next()
    } else {
        return res.status(400).json({status : 0, msg : "Please Enter a Valid Mobile Number"})
    }
}

const validateRegisteration = (req, res, next) => {
    const { email, name, password, mobile, type } = req.body
    if(!name) return res.status(400).json({status : 0, msg : "Please Enter a Name"})
    if(!password) return res.status(400).json({status : 0, msg : "Please Enter a Password"})
    if(type && !email) return res.status(400).json({status : 0, msg : "Please Enter a Valid Email"})
    next()
}

const validateOtp = (req, res, next) => {
    const { otp } = req.body;
    if( parseInt(otp) >= 100000 && parseInt(otp) <= 999999 ){
        next()
    } else {
        return res.status(400).json({status : 0, msg : "Please Enter a Valid Mobile Number"})
    }
}

const validatePartnerUpdate = (req, res, next) => {
    const { passportPhoto, card, fssai } = req.body;
    if(!passportPhoto) return res.status(400).json({status : 0, msg : 'Provide A Passport Size Photo'});
    next()
}

module.exports = {
    authenticateToken, 
    validateMobile,
    validateRegisteration,
    validateOtp,
    validatePartnerUpdate
}