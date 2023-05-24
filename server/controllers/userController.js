const bcrypt = require('bcrypt')
const jwt = require ('jsonwebtoken')
const {User, Cart} = require('../models/models')
const ApiError = require("../error/ApiError");

const generateJwt = (id, email, role) => {
    return jwt.sign(
        {id, email},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController{

    async signup(req, res, next) {
        const {email, password} = req.body
        if (!email || !password){
            return next(ApiError.badRequest('Enter email or password'))
        }
        const user = await User.findOne({where:{email}})
        if(user){
            return next(ApiError.badRequest('This user already exist'))
        }
        const hashPassword = await bcrypt.hash(password, 7)

        const newUser = await User.create({email, password: hashPassword})
        const cart = await Cart.create({userId: newUser.id})

        const token = generateJwt(newUser.id, newUser.email)
        return res.json({token})
    }

    async login(req, res, next) {
        const {email, password} = req.body
        if (!email || !password){
            return next(ApiError.badRequest('Enter email or password'))
        }
        const user = await User.findOne({where:{email}})
        if(!user){
            return next(ApiError.badRequest('This user not exist. Sign up'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if(!comparePassword){
            return next(ApiError.badRequest('Wrong password'))
        }
        const token = generateJwt(user.id, user.email)
        return res.json({token})
    }

    async auth(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email)
        return res.json({token})
    }
}

module.exports = new UserController()
