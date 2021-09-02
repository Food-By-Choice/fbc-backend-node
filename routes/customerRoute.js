const express = require('express')
const router = express.Router()

const {
    addAddress, updateAddressIndex
} = require('../controllers/customerControllers.js')

const { 
    authenticateToken
} = require('../middleware/middleware.js')

router.post('/addAddress', authenticateToken, addAddress)
router.post('/updateAddressIndex', authenticateToken, updateAddressIndex)

module.exports = router
