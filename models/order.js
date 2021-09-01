const mongoose = require('mongoose');

// status = [delivered, preparing, on-the-way, failed]
const OrderSchema = mongoose.Schema({
    id : {type : String, unique : true },
    customer_id : String,
    shop_id : String,
    delivery_id : String,
    contents : [],
    orderPrice : Number,
    status : String
}, { timestamps : true })

const Order = mongoose.model('order', OrderSchema)

module.exports = {
    Order
}


// 'id' should be generated with prefix 'OD'
// a new Order is created when a customer places an order.
// 'customer_id' is the id of the customer who plcaed this order.
// 'shop_id' is the id of the shop from where the food/product is ordered

// 'delivery_id' is the id of guy who is delivering the order, this will be added when the order is dispatched. Once the order is delivered 
// the id will be replaced by the 'id' from 'Delivery Schema'

// 'contents' is the array of foodItems / Products with ordered quantities by the user 
// ex. contents = [ { item : FoodSchema/ProductSchema, quantity : 2 }, { item : FoodSchema/ProductSchema, quantity : 4 } ]

// 'orderPrice' is the total price of the order excluding taxes or delivery charges
// 'status' is the current state of order 