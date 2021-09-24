const express = require('express')
const router = express.Router()

const {
    addAddress, updateAddressIndex
} = require('../controllers/customerControllers.js')

const {
    authenticateToken
} = require('../middleware/middleware.js')

const {
    findShops
} = require('../controllers/findAllShopsZip.js')



router.post('/add-address', authenticateToken, addAddress)
router.post('/update-address-index', authenticateToken, updateAddressIndex)

router.get('/get-shops-zip',authenticateToken,findShops)

module.exports = router
