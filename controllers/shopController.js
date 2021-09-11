const { Shop } = require('../models/Shop.js')

const createShop = async(req,res)=>{
    const { distributor_id } = req.user;
    const {shopType,shopName,thumbnail,images,address,alternateContacts,menu,foodType,mealType,cuisineType,averageCost,timings,acceptingOrder,reviews,avgRating,orders,pureveg}
    = req.body;

    const shopId = 'SH0092342321' //Shop Id
    try {
        const shop = await new Shop({
            "id" : shopId,
            "shopType":shopType,
            "distributor_id":distributor_id,
            "shopName":shopName,
            "thumb":thumbnail,
            "images":images,
            "address":address,
            "alternateContacts":alternateContacts,
            "menu":menu,
            "foodType":foodType,
            "mealType":mealType,
            "cuisineType":cuisineType,
            "averageCost":averageCost,
            "timings":timings,
            "acceptingOrder":acceptingOrder,
            "reviews":reviews,
            "avgRating":avgRating,
            "orders":orders,
            "pureveg":pureveg

        });
        await shop.save()
        res.status(200).json({status : 1, msg : "New shop created"})
    } catch (error) {
        res.status(500).json({status : 0, msg : error.message})
      }
}

module.exports = {
    createShop
}
