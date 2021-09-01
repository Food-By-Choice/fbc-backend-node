const mongoose = require('mongoose');
const { Delivery } = require('./delivery');
const { IDCard } = require('./commonModels.js');

const DeliveryBoySchema = mongoose.Schema({
    id : { type : String, unique : true },
    name : { type : String },
    image : { type : String },
    kyc : [IDCard],
    deliveries : [Delivery],
    currentLocation : { lat : String, long : String },
    status : String
})

const DeliveryBoy = mongoose.model('deliveryboy', DeliveryBoySchema);

module.exports = {
    DeliveryBoy
}

// the 'id' here is the same id which was generated when this delivery guy signed up, which is also stored there in 'Login'
// 'image' is the passport size photo.
// 'kyc' should be prioritized with Driving Licence
// 'deliveries' are those deliveries that are/were assigned to this delivery guy
// 'currentLocation' => real time location of delivery boy
// 'status' => ['active', 'offline' ] => delivery boy should be turn this on/off 