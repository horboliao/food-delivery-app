const {Item, ItemInfo} = require("../models/models");
const uuid = require("uuid")
const ApiError = require("../error/ApiError");
const path = require("path");

class ItemController{
    async getAll(req, res) {
        const {categoryId, placeId} = req.query
        let items
        if (!categoryId&&!placeId){
            items = Item.findAll()
        }
        if (!categoryId&&placeId){
            items = Item.findAll({where:{placeId}})
        }
        if (categoryId&&!placeId){
            items = Item.findAll({where:{categoryId}})
        }
        if (categoryId&&placeId){
            items = Item.findAll({where:{categoryId, placeId}})
        }
        return res.json(items)
    }
    async getById(req, res) {
        const {id} = req.params
        const item = await Item.findOne(
            {
                where:{id},
                include:[{model:ItemInfo, as: 'item_infos'}]
            })
        return res.json(item)
    }

    async create(req, res, next) {
        try {
            let {name, price, placeId, categoryId, description} = req.body
            const {img} = req.files

            if(!name||!price||!placeId||!categoryId||!img){
                return next(ApiError.badRequest("Some parameters are missing"))
            }

            let fileName = uuid.v4() + ".jpg"
            await img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const device = await Item.create({name, price, placeId, categoryId, img: fileName});

            if (description) {
                description = JSON.parse(description)
                description.forEach(i =>
                    ItemInfo.create({
                        title: i.title,
                        description: i.description,
                        deviceId: device.id
                    })
                )
            }

            return res.json(device)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }
}

module.exports = new ItemController()
