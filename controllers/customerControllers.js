const { Customer } = require('../models/customer.js')

const addAddress = (req, res) => {
    const {  } = req.body;
    const { id } = req.user;

    try {
        const customer = await Customer.find({"id" : id})
        await Customer.findOneAndUpdate({"id" : id}, {
            "address" : [...customer.address, address]
        })
        res.status(200).json({status : 1, msg : "Address Added"})
    } catch (error) {
        res.status(500).json({status : 0, msg : error.message})
    }

}

module.exports = {
    addAddress
}