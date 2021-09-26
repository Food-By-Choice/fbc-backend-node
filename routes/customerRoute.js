const express = require('express')
const router = express.Router()

const {
    addAddress, updateAddressIndex
} = require('../controllers/customerControllers.js')

const {
    authenticateToken
} = require('../middleware/middleware.js')

const {
    findShopWithZipcode , findShopWithLastAddress
} = require('../controllers/findAllShopsZip.js')

router.post('/add-address', authenticateToken, addAddress)
router.post('/update-address-index', authenticateToken, updateAddressIndex)

router.get('/get-shops-zipcode',findShopWithZipcode)
router.get('/get-shops-last-address',authenticateToken,findShopWithLastAddress)

module.exports = router
