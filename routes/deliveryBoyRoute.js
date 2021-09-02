const express = require('express')
const router = express.Router()

const {
    updateDetails,
    updateLocation,
    toggleDriverState
} = require('../controllers/deliveryBoyControllers.js')

const { 
    authenticateToken, 
    validatePartnerUpdate 
} = require('../middleware/middleware.js')

router.post('/updateDetails', authenticateToken, validatePartnerUpdate, updateDetails)
router.post('/updateLocation', authenticateToken, updateLocation)
router.get('/toogleDriverState', authenticateToken, toggleDriverState)

module.exports = router