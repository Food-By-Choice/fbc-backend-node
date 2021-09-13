const { Shop } = require('../models/Shop.js')

//added createShop,updateMenu,toggleStatus

const createShop = async(req,res)=>{
    const distributor_id = req.user.id;
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
            "menu":menu,
            "foodType":foodType,
            "mealType":mealType,
            "cuisineType":cuisineType,
            "timings":timings,
            "orders":orders,
        });
        await shop.save()
        res.status(200).json({status : 1, msg : "New shop created"})
    } catch (error) {
        res.status(500).json({status : 0, msg : error.message})
      }
}

const updateMenu = async(req,res)=>{
  const distributor_id = req.user.id;
  const reqShopId = req.body.id;
  const updateItems = req.body.updateItems;
  try {
      const updatedMenu = await Shop.findByIdAndUpdate({distributor_id : distributor_id,id:reqShopId},updateItems);
      res.status(200).json({status:1, msg : "Menu Updated"});
  } catch (error) {
      res.status(500).json({status : 0, msg : error.msg})
  }
}

const toggleStatus = async(req,res)=>{
  const distributor_id = req.user.id;
  const shopId = req.body.id;
  try{
    const foundShop = await Shop.findById({"id":distributor_id});
    const toggle = foundShop.acceptingOrder ? false:true;
    const updatedToggle = await Shop.findByIdAndUpdate({distributor_id : distributor_id,id:reqShopId},{$set:{acceptingOrder:toggle}})

    res.status(200).json({status:1, msg : "Status changed to"+toggle?"accepting orders":"not accepting orders"});
  } catch (error){
    res.status(500).json({status : 0, msg : error.msg})
  }

}


module.exports = {
    createShop,
    updateMenu,
    toggleStatus
}
