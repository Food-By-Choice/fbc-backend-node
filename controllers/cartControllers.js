const { Cart } = require("../models/cart.js")

// to add an item into cart
const addItem = async(req, res) => {
    const {id} = req.user
    const {foodItem,shopProduct} = req.body
    try{
        if((await Cart.find({"customer_id": id})).length==0){
            const cart = await new Cart({
                "id" : cartId,//should be generated with a prefix of CT
                "customer_id": id,
                "foodItems": [],
                "shopProducts": [],
            });
            await cart.save()
        }
        if(foodItem!=undefined){
            await Cart.updateOne({"customer_id": id},{$push :{"foodItems" : foodItem}})
            res.status(200).json({status : 1, msg : "Item added to cart"})
        }else if(shopProduct!=undefined){
            await Cart.updateOne({"customer_id": id},{$push :{"shopProducts": shopProduct}})
            res.status(200).json({status : 1, msg : "Product added to cart"})
        }else{
            res.status(400).json({status : 0, msg : "Item or Product must be provided"})
        }
    }catch(error){
        res.status(500).json({status : 0, msg : error.message})
    }
}

// to remove an item from cart
const removeItem = async(req, res) => {
    const {id} = req.user
    const {foodItem,shopProduct} = await req.body
    try{
        if(foodItem!=undefined){
            await Cart.updateOne({"customer_id": id},{ $pull: {"foodItems": { "item.id" : foodItem.item.id } } })
            res.status(200).json({status : 1, msg : "Item removed from cart"})
        }else if(shopProduct!=undefined){
            await Cart.updateOne({"customer_id": id},{ $pull: {"shopProducts": { "item.id" : shopProduct.item.id} } })
            res.status(200).json({status : 1, msg : "Product removed from cart"})
        }else{
            res.status(400).json({status : 0, msg : "Item or Product must be provided"})
        }
    }catch(error){
        res.status(500).json({status : 0, msg : error.message})
    }
}

// to list the items in the cart
const listCart = async(req, res) =>{
    const {id} = req.user
    try{
        data = await Cart.findOne({"customer_id": id})
        if(data == null || ((data['foodItems'] == undefined || data['foodItems'].length == 0)&& (data['shopProducts']==undefined || data['shopProducts'].length == 0))){
            await Cart.deleteOne({"customer_id": id})
            res.status(200).json({status : 0, msg : "Cart is empty"})
        }else{
            res.status(200).json({status: 1, data: data})
        }
    }catch(error){
        res.status(500).json({status : 0, msg : error.message})
    }
}

const incQuantity = async(req,res) =>{
    const {id} = req.user
    const {foodItem,shopProduct} = await req.body
    try{
        if(foodItem!=undefined){
            await Cart.updateOne({"customer_id": id,"foodItems.item.id": foodItem.item.id},{$inc:{"foodItems.$.quantity":1}})
            res.status(200).json({status : 1, msg : "Increased quantity of items"})
        }else if(shopProduct!=undefined){
            await Cart.updateOne({"customer_id": id,"shopProducts.item.id": shopProduct.item.id},{$inc:{"shopProducts.$.quantity":1}})
            res.status(200).json({status : 1, msg : "Increased quantity of products"})
        }else{
            res.status(400).json({status : 0, msg : "Item or Product must be provided"})
        }
    }catch(error){
        res.status(500).json({status : 0, msg : error.message})
    }
}

const decQuantity = async(req,res) =>{
    const {id} = req.user
    const {foodItem,shopProduct} = await req.body
    try{
        if(foodItem!=undefined){
            const data = await Cart.findOne({"customer_id": id,"foodItems.item.id": foodItem.item.id})
            if(data!=null){
                for (const i in data.foodItems) {
                    if(!isNaN(i)){
                        if(data.foodItems[i]["item"]["id"]==foodItem.item.id){
                            console.log(data.foodItems[i]["item"]["id"])
                            console.log(foodItem.item.id)
                            console.log(data.foodItems[i]["quantity"])
                            if(data.foodItems[i]["quantity"]>1){
                                await Cart.updateOne({"customer_id": id,"foodItems.item.id": foodItem.item.id},{$inc:{"foodItems.$.quantity":-1}})
                            }else{
                                await Cart.updateOne({"customer_id": id},{ $pull: {"foodItems": { "item.id" : foodItem.item.id } } })
                            }
                            break
                        }
                    }
                }
                res.status(200).json({status : 1, msg : "Decreased quantity of items"})
            }
            res.status(404).json({status : 0, msg : "No such item"})
        }else if(shopProduct!=undefined){
            const data = await Cart.findOne({"customer_id": id,"shopProducts.item.id": shopProduct.item.id})
            if(data!=null){
                for (const i in data.shopProducts) {
                    if(!isNaN(i)){
                        if(data.shopProducts[i]["item"]["id"]==shopProduct.item.id){
                            console.log(data.shopProducts[i]["item"]["id"])
                            console.log(shopProduct.item.id)
                            console.log(data.shopProducts[i]["quantity"])
                            if(data.shopProducts[i]["quantity"]>1){
                                await Cart.updateOne({"customer_id": id,"shopProducts.item.id": shopProduct.item.id},{$inc:{"shopProducts.$.quantity":-1}})
                            }else{
                                await Cart.updateOne({"customer_id": id},{ $pull: {"shopProducts": { "item.id" : shopProduct.item.id } } })
                            }
                            break
                        }
                    }
                }
                res.status(200).json({status : 1, msg : "Decreased quantity of items"})
            }
            res.status(404).json({status : 0, msg : "No such item"})
        }else{
            res.status(400).json({status : 0, msg : "Item or Product must be provided"})
        }
    }catch(error){
        res.status(500).json({status : 0, msg : error.message})
    }
}

module.exports = {
    addItem,
    removeItem,
    listCart,
    incQuantity,
    decQuantity
}