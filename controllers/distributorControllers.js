const { Distributor } = require('../models/distributor.js')

const updateDetails = async(req, res) => {

    const { passportPhoto, card, fssai } = req.body;
    const distributor_id  = req.user.id;

    try {
        await Distributor.findOneAndUpdate({"id" : distributor_id}, {
            "image" : passportPhoto,
            "kyc" : card,
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
