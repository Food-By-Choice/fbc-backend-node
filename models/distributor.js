const mongoose = require('mongoose');

const { IDCard } = require('./commonModels.js')

const DistributorSchema = mongoose.Schema({
    id : { type : String, unique : true },
    name : { type : String },
    image : { type : String },
    kyc : IDCard,
    fssaiLicence : String
})

const Distributor = mongoose.model('distributor', DistributorSchema)

module.exports = {
    Distributor
}

// the 'id' here is the same id which was generated when this distributor signed up, which is also stored there in 'Login'
// 'image' is a passport size photo
// 'kyc' can be done using PAN, Adhhaar or any other cards, they have to upload picture of front and back side of the card, and other details.
// 'fssaiLicence' - discussion needed
