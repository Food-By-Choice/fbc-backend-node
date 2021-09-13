const mongoose = require('mongoose');
const { Delivery,DeliverySchema } = require('./delivery');
const { IDCard } = require('./commonModels.js');

const DeliveryBoySchema = mongoose.Schema({
    id : { type : String, unique : true },
    name : { type : String },
    image : { type : String },
    kyc : [IDCard],
    deliveries : [DeliverySchema],
    currentLocation : { lat : String, long : String, locationStatus : String },
    online : Boolean
})

const DeliveryBoy = mongoose.model('deliveryboy', DeliveryBoySchema);

module.exports = {
    DeliveryBoy
}

// the 'id' here is the same id which was generated when this delivery guy signed up, which is also stored there in 'Login'
// 'image' is the passport size photo.
// 'kyc' should be prioritized with Driving Licence
// 'deliveries' are those deliveries that are/were assigned to this delivery guy
// 'currentLocation' => real time location of delivery boy and 'locationnStatus' = what the driver is doing currently ? like 'On the way' etc.
// 'online' : true => if the driver is on job, else false
