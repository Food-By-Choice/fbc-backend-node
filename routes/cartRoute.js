const express = require('express')
const router = express.Router()

const { 
    authenticateToken
} = require('../middleware/middleware.js')

const {
    addItem,
    removeItem,
    listCart,
    incQuantity,
    decQuantity
} = require('../controllers/cartControllers.js')

router.post('/addItem', addItem)
router.post('/listCart', listCart)
router.post('/removeItem', removeItem)
router.post('/incItem', incQuantity)
router.post('/decItem', decQuantity)

module.exports = router