const {Place} = require("../models/models");

class PlaceController{
    async getAll(req, res) {
        const places = await Place.findAll()
        return res.json(places)
    }

    async create(req, res) {
        const {name} = req.body
        const place = await Place.create({name})
        return res.json(place)
    }
}

module.exports = new PlaceController()
