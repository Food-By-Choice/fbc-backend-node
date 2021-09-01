const mongoose = require('mongoose');

const { AddressSchema, FoodSchema, ProductSchema } = require('./commonModels');
const { Order } = require('./order');

const WishlistSchema = mongoose.Schema({
    foodItems : [FoodSchema],
    shopProducts : [ProductSchema]
})

const CustomerSchema = mongoose.Schema({
    id : { type : String, unique : true },
    name : { type : String, trim : true },
    address : [AddressSchema],
    currentAddressIndex : { type : Number , default : 0 },
    image : { type : String, default : 'https://www.pngarts.com/files/10/Default-Profile-Picture-Download-PNG-Image.png'},
    // orders : [Order],
    wishlist : [WishlistSchema],
    cart_id : { type : String }
}, {timestamps : true})

const Customer = mongoose.model('customer', CustomerSchema)

module.exports = {
    Customer
}

// the 'id' here is the same id which was generated when this customer signed up, which is also stored there in 'Login'
// 'address' is an array of 'AddressSchema' because a customer can have multiplr addresses saved.
// 'wishlist' (can also be termed as 'favorites') is collection of those products which are 'hearted' by the customer on the front end.
// 'cart_id' => will be added when the user adds something to his cart for the first time. This will be permanent after that.