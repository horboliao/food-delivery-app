const {Cart, CartItem} = require("../models/models");
const {where} = require("sequelize");
const ApiError = require("../error/ApiError");
const path = require("path");

class CartController{
    async getByUserId(req, res, next) {
        const {id} = req.params
        if(!id){
            return next(ApiError.badRequest("Need user id"))
        }
        const cart = await Cart.findOne(
            {
                where:{id},
                include:[{model:CartItem, as: 'cart_items'}]
            })
        return res.json(cart)
    }
    async addItem(req, res, next) {
        try {
            const {cartId, itemId} = req.query
            const item = await CartItem.create({cart_id: cartId, item_id: itemId})
            return res.json(item)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }
}

module.exports = new CartController()
