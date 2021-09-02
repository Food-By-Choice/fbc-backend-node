const { DeliveryBoy } = require('../models/deliveryBoy.js')

const updateDetails = async(req, res) => {
    const { passportPhoto, cards, fssai } = req.body;
    const { id } = req.user;
    try {
        const deliveryBoy = await DeliveryBoy.findOne({"id" : id})
        await DeliveryBoy.findOneAndUpdate({"id" : id}, {
            "image" : passportPhoto, 
            "kyc" : [...deliveryBoy.card, ...cards], 
            "fssaiLicence" : fssai
        })
        res.status(200).json({status:1, msg : "Details Updated"})
    } catch (error) {
        res.status(500).json({status : 0, msg : error.message})
    }
}

const updateLocation = async(req, res) => {
    const { lat, long, locationStatus} = req.body;
    const { id } = req.user;
    const location = { lat, long, locationStatus }
    try {
        await DeliveryBoy.findOneAndUpdate({"id" : id}, {
            "currentLocation" : location
        })
        res.status(200).json({status : 1, msg : "Location Updated"})
    } catch (error) {
        res.status(500).json({status : 0, msg : error.message})
    }
}

const toggleDriverState = async(req, res) => {
    const { id } = req.user;
    try {
        const driver = await DeliveryBoy.find({"id" : id}) 
        await DeliveryBoy.findOneAndUpdate({"id" : id}, {
            "online" : !driver.online
        })
        res.status(200).json({status : 1, msg : `Delivery Partner ${!driver.online ? 'Online' : 'Offline'}`})
    } catch (error) {
        res.status(500).json({status : 0, msg : error.message})
    }
}


module.exports = {
    updateDetails,
    updateLocation,
    toggleDriverState
}