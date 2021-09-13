const mongoose = require('mongoose');
const { AddressSchema } = require('./commonModels');

const DeliverySchema = mongoose.Schema({
    id : { type : String, unique : true },
    customer_id : String,
    delivery_guy_id : String,
    order_id : String,
    address : AddressSchema,
    status : String
}, {timestamps : true})

const Delivery = mongoose.model('delivery', DeliverySchema)

module.exports = {
    Delivery,
    DeliverySchema
}

// 'id' should be generated with prefix 'DI'
// a new Delivery is created when a shop owner dispatches an order.
// 'customer_id' is the id of the customer who plcaed this order.
// 'delivery_guy_id' is the id of the delivery person who is delivering.
// 'order_id' => order id which is being delivered.
// 'address' => place where the order is being delivered
// 'status' => 'on-the-way', 'delivered', 'failed'
