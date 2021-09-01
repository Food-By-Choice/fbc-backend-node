const mongoose = require('mongoose');
const { FoodSchema, ProductSchema } = require('./commonModels');

const FoodItem = mongoose.Schema({
    item : FoodSchema,
    quantity : { type : Number , default : 1 }
})

const ShopProduct = mongoose.Schema({
    item : ProductSchema,
    quantity : { type : Number , default : 1 }
})

const CartSchema = mongoose.Schema({
    id : { type : String, unique : true },
    customer_id : { type : String, unique : true },
    foodItems : [FoodItem],
    shopProducts : [ShopProduct]
}, { timestamps : true })

const Cart = mongoose.model('cart', CartSchema);

module.exports = {
    Cart
}

// a 'Cart' is created when a user puts item in his/her cart and the 'customer_id' is assigned to this 'cart' is the 'id' of the creator.
// 'id' is cart id, which should be genrated when a cart is created with the prefix 'CT' 
// a cart can have food items and/or products that user has been shopped for. 
// each of this food items and products, a quantity is must. 