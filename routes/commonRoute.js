const express = require('express')
const router = express.Router()

const {
    getNearbyShops
} = require('../controllers/commonControllers.js')

router.get('/nearby-shops',getNearbyShops)

module.exports = router
