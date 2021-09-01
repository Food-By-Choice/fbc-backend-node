const { DeliveryBoy } = require('../models/deliveryBoy')

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
        res.status(500).json({status : 0, msg : error.msg})
    }

}


module.exports = {
    updateDetails
}