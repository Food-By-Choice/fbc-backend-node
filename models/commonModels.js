const mongoose = require('mongoose');

// foodType = [ snack, main-course, dessert ] etc => research
// mealType = [ brekfast, lunch, dinner ] etc  => research
// cuisineType = [ indian, chinese, mexican ] etc => research
const FoodSchema = mongoose.Schema({
    id : { type : String, unique : true },
    name : { type : String },
    price : { type : Number },
    imgLabel : { type : String, default : 'Food-Image'},
    description : String,
    contains : [String],
    foodType : [String],
    mealType : [String],
    cuisineType : [String],
    img : String
})

const ProductSchema = mongoose.Schema({
    id : { type : String, unique : true },
    brand : String,
    name : { type : String },
    price : { type : Number },
    imgLabel : { type : String, default : 'Product-Image'},
    description : String,
    img : String  
})


// addressType : { 0 : home, 1 : office, 2 : misc }
const AddressSchema = mongoose.Schema({
    geolocation : { lat : Number, long : Number },
    contact : String,
    house : String,
    area : String,
    landmark : String,
    city : String,
    addressType : Number,
    zipcode : { type : Number }
})

const IDCard = mongoose.Schema({
    number : { type : String, unique : true },
    nameOnCard : { type : String },
    imgFront : String,
    imgBack : String,
    cardType : String
})

module.exports = {
    FoodSchema, ProductSchema, AddressSchema, IDCard
}