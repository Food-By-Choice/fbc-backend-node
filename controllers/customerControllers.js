const { Customer } = require('../models/customer.js')

const addAddress = async(req, res) => {
    const { address } = req.body;
    const { id } = req.user;
    try {
        const customer = await Customer.find({"id" : id})
        await Customer.findOneAndUpdate({"id" : id}, {
            $push : {"address" : address},
            "currentAddressIndex" : customer.address.length - 1
        })
        res.status(200).json({status : 1, msg : "Address Added"})
    } catch (error) {
        res.status(500).json({status : 0, msg : error.message})
    }
}

const updateAddressIndex = async(req, res) => {
    const { index } = req.body;
    const { id } = req.user;
    try {
        await Customer.findOneAndUpdate({"id" : id}, {
            "currentAddressIndex" : index
        })
        res.sendStatus(200)
    } catch (error) {
        res.status(500).json({status : 0, msg : error.message})
    }
}

module.exports = {
    addAddress,
    updateAddressIndex
}