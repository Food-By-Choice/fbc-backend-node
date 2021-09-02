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

router.post('/update-details', authenticateToken, validatePartnerUpdate, updateDetails)
router.post('/update-location', authenticateToken, updateLocation)
router.get('/toogle-driver-state', authenticateToken, toggleDriverState)

module.exports = router