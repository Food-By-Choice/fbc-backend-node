const express = require('express')
const router = express.Router()

const {
    updateDetails
} = require('../controllers/distributorControllers.js')

const {
    createShop,updateMenu,toggleStatus
} = require('../controllers/shopController.js')


const {
    authenticateToken,
    validatePartnerUpdate
} = require('../middleware/middleware.js')

router.post('/update-details', authenticateToken, validatePartnerUpdate, updateDetails)
router.post('/create-shop',authenticateToken,createShop)
router.patch('/update-menu',authenticateToken,updateMenu)
router.patch('/toggle-status',authenticateToken,toggleStatus)

module.exports = router
