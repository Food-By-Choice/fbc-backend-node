const express = require('express')
const router = express.Router()

const {
    updateDetails
} = require('../controllers/distributorControllers.js')

const {
    createShop
} = require('../controllers/shopController.js')

const {
    authenticateToken,
    validatePartnerUpdate
} = require('../middleware/middleware.js')

router.post('/update-details', authenticateToken, validatePartnerUpdate, updateDetails)
router.post('/create-shop',authenticateToken,validatePartnerUpdate,createShop)

module.exports = router
