const express = require('express')
const router = express.Router()

const {
    addAddress, updateAddressIndex
} = require('../controllers/customerControllers.js')

const { 
    authenticateToken
} = require('../middleware/middleware.js')

router.post('/add-address', authenticateToken, addAddress)
router.post('/update-address-index', authenticateToken, updateAddressIndex)

module.exports = router
