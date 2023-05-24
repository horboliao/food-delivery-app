const Router= require('express')
const router = new Router()
const categoryRouter = require('./categoryRouter')
const userRouter = require('./userRouter')
const itemRouter = require('./itemRouter')
const placeRouter = require('./placeRouter')
const cartRouter = require('./cartRouter')

router.use('/category', categoryRouter)
router.use('/item', itemRouter)
router.use('/place', placeRouter)
router.use('/user', userRouter)
router.use('/cart', cartRouter)

module.exports = router
