const mongoose = require('mongoose');

// user Type =  { 0 : Customer , 1 : Distributor , 2 : Delivery } 

const LoginSchema = mongoose.Schema({
    id : { type : String, required : true, unique : true },
    mobile : { type : String, unique : true, required : true },
    email : { type : String, unique : true },
    userType : { type : Number, required : true },
    hashedPassword : { type : String , required : true },
    refreshToken : String
}, { timestamps : true })

const Login = mongoose.model('login', LoginSchema);

module.exports = {
    Login
}

// id should be generated with the prefix { CU : customer, DI : distributor, DL : delivery boy }
// for customers either email, or contact is needed for sign up. Eventually they have to put their contact for delivery.
// for distributors and delivery boy, both email and contact are required for sign up