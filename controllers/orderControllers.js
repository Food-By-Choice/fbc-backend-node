const { Order } = require('../models/order.js')

const createOrder = async(req, res) => {
    const { id } = req.user;
    const { shop_id, contents, price, status } = req.body;

    const orderId = 'OD0092342321'
    try {
        const order = await new Order({
            "id" : orderId,
            "customer_id" : id,
            "shop_id" : shop_id,
            "contents" : contents,
            "orderPrice" : price,
            "status" : status
        })  
        await order.save()
        res.status(200).json({status : 1, msg : "Order Placed"})
    } catch (error) {
        res.status(500).json({status : 0, msg : error.message})
    }
}

const updateOrderStatus = async(req, res) => {
    
}

// const dispatchDelivery =  

module.exports = {
    createOrder
}