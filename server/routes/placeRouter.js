const Router= require('express')
const router = new Router()
const placeController = require('../controllers/placeController')

router.get('/',placeController.getAll)
router.post('/',placeController.create)

module.exports = router
