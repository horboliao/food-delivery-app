const Router= require('express')
const router = new Router()
const cartController = require('../controllers/cartController')
const authMiddleware = require("../middleware/authMiddleware");

router.get('/:id',authMiddleware,cartController.getByUserId)
router.post('/',authMiddleware,cartController.addItem)


module.exports = router
