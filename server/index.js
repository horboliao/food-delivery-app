require('dotenv').config()
const sequelize = require('./db')
const express = require('express')
const models = require('./models/models')
const router = require('./routes/index')
const cors = require('cors')
const fileupload = require('express-fileupload')
const path = require('path')
const errorHadler = require('./middleware/ErrorHandlingMiddleware')

const PORT = process.env.PORT || 5000
const app = express()
app.use(cors())
app.use(fileupload({}))
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(express.json())
app.use('/api', router)
app.use(errorHadler)

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}
start()

