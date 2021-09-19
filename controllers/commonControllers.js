var { Shop } = require("../models/shop.js")
const getNearbyShops = async (req, res) => {
    // frontend sends a query with latitude, longitude, and distance as query parameters
    const { lat, long, distance } = await req.query
    // finding for the list of shops nearby
    try {
        var shopsList = await Shop.find({
            "address.geolocation.lat": {
                $lt: lat + distance / 100,
                $gt: lat - distance / 100
            },
            "address.geolocation.long": {
                $lt: long + distance / 100,
                $gt: long - distance / 100
            }
        })
        // if successfully found a list of shops then they will be sent as response
        if (shopsList.length == 0) {
            res.status(200).json({ status: 0, msg: "No shops nearby"})
        } else {
            res.status(200).json({ status: 1, shops: shopsList })
        }
    } catch (error) {
        res.status(500).json({ status: 0, msg: error.message })
    }
}

module.exports = {
    getNearbyShops
}