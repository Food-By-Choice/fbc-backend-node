const mongoose = require('mongoose');
const { AddressSchema, FoodSchema } = require('./commonModels');
const { OrderSchema } = require('./order');

const MenuSectionItem = mongoose.Schema({
    item : FoodSchema,
    inStock : { type : Boolean, default : true },
    customizable : { type : Boolean, default : false },
    customization : []
})

const MenuSection = mongoose.Schema({
    title : { type : String },
    items : [MenuSectionItem]
})

const ReviewSchema = mongoose.Schema({
    rating : Number, // max 5
    author : String, // name of user
    review : String
})

// foodType = [ snack, main-course, dessert ] etc => research
// mealType = [ brekfast, lunch, dinner ] etc  => research
// cuisineType = [ indian, chinese, mexican ] etc => research
// shopType = [ restaurant, tiffin, dairy, general Store]
const ShopSchema = mongoose.Schema({
    id : { type : String, unique : true },
    shopType : String,
    distributor_id : { type : String },
    shopName : { type : String },
    thumb : { type : String, default : 'https://image.freepik.com/free-vector/happy-shop-logo-template_57516-57.jpg' },
    images : [String],
    address : AddressSchema,
    alternateContacts : [Number],
    menu : [MenuSection],
    foodType : [String],
    mealType : [String],
    cuisineType : [String],
    averageCost : { cost : Number, for : { type : Number, default : 1 }},
    timings : { open : String, close : String },
    acceptingOrder : { type : Boolean, default : true },
    reviews : [ReviewSchema],
    avgRating : Number,
    orders : [OrderSchema],
    pureveg : { type : Boolean, default : false }
}, {timestamps : true})

const Shop = mongoose.model('shop', ShopSchema)

module.exports = {
    Shop
}

// 'id' should be generated with prefix 'SH'
// a new Shop is created by a distributor.
// 'distributor_id' is the id of the distributor who created this shop.
// 'shopName' is the name of shop.
// 'thumb' can be the Logo of the shop ( if they have ), think it as a profile picture
// 'images' - url of images uploaded by the shopkeeper / distributor

// 'menu' is array of menuSections that a shop has
// 'menuSection' is array of menuItems that a shop has
// 'inStock' = true if item is currently available, false if not
// 'customizable' = true if the item is customizable, like a thali can be customized with 2 or 3 rotis, ( applicable only for restaurants and tiffins)
// 'customization' are the options for available customization.
// example : customization = [
//     {
//         sectionTitle : 'Roti',
//         options : [
//             {
//                 title : '2 Roti',
//                 price : 20,
//             },
//             {
//                 title : '4 Roti',
//                 price : 35
//             }
//         ]
//     },
//     {
//         sectionTitle : 'Quantity',
//         options : [
//             {
//                 title : 'Half',
//                 price : 60,
//             },
//             {
//                 title : 'Full',
//                 price : 110
//             }
//         ]
//     }
// ]

// 'foodType', 'mealType', 'cuisineType' and 'avrageCost' are only applicable for restaurants and tiffin centers.
// 'pureVeg' => true if and only if it is pure vegetarian ( only for restaurants and tiffin centers )

// 'timings' => 'open' is opening time, 'close' : closing time.
// 'acceptingOrder' => true if the shop is accepting, else false. ( switchable any time )

// 'reviews' => reviews given by customers.
// 'avgRating' => calculated every time a new review is added
// 'orders' => all the orders ever placed for this shop.
