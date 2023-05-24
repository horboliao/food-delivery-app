const {Item, ItemInfo} = require("../models/models");
const {where} = require("sequelize");

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

    /*async create(req, res, next) {
        try {
            let {name, price, brandId, typeId, info} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const device = await Device.create({name, price, brandId, typeId, img: fileName});

            if (info) {
                info = JSON.parse(info)
                info.forEach(i =>
                    DeviceInfo.create({
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

    }*/
}

module.exports = new ItemController()
