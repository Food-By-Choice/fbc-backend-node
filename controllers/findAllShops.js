const { Shop } = require('../models/shop.js')
const { Customer } = require('../models/customer.js')

const findShopWithLastAddress = async(req,res)=>{
    const customer_id = req.user.id;

    try {
        const customer = await Customer.find({"id" : customer_id});
        const currentIndex = customer.currentAddressIndex;

        const customerAddress = await customer.address[currentIndex]; //customer last delivery address
        const customerZip = customerAddress.zipcode;

        const shops = Shop.find({"zipcode":customerZip}); //array of shops
        const shopsInfoAll=[];
        shops.forEach(function(shop){

            const shopInfoSingle = { //data to send to customer
              name:shopName
            }
            shopInfoAll.push(shopInfoSingle);
        });

        const shopsData = {
          data:shopsInfoAll
        }

        res.status(200).json({status : 1, msg : shopsData});

    } catch (error) {
        res.status(500).json({status : 0, msg : error.message});
    }
}

const findShopWithZipcode = function(req,res)=>{
    const shopsZip = req.params.zipcode;

    try{
      const shops = Shop.find({"zipcode":shopsZip});
      const shopsInfoAll=[];
      shops.forEach(function(shop){

          const shopInfoSingle = { //data to send to customer
            name:shopName
          }
          shopInfoAll.push(shopInfoSingle);
      });

      const shopsData = {
        data:shopsInfoAll
      }

      res.status(200).json({status : 1, msg : shopsData});

  } catch (error) {
      res.status(500).json({status : 0, msg : error.message});
  }
}
