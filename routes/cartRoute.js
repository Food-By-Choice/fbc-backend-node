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

router.post('/addItem', authenticateToken, addItem)
router.post('/listCart', authenticateToken, listCart)
router.post('/removeItem', authenticateToken, removeItem)
router.post('/incItem', authenticateToken, incQuantity)
router.post('/decItem', authenticateToken, decQuantity)

module.exports = router