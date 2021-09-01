const express = require('express')
const router = express.Router()

const {
    updateDetails
} = require('../controllers/distributorControllers.js')

const { 
    authenticateToken, 
    validatePartnerUpdate 
} = require('../middleware/middleware.js')

router.post('/updateDetails', authenticateToken, validatePartnerUpdate, updateDetails)

module.exports = router
