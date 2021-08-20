import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import fileUpload from 'express-fileupload'
import sequelizeStore from './db.js'
import router from './routes/index.js'
import errorHandler from './middleware/ErrorHandlingMiddleware.js'
import models from './models/models.js'

dotenv.config()
const PORT = process.env.PORT || 5000

const app = express()
app.use(cors())
app.use(express.json())
app.use(fileUpload({}))
app.use(express.static('static'))
app.use('/api', router)

// Обработка ошибок, последний Middleware
app.use(errorHandler)
const startApp = (async () => {
    try {
        await sequelizeStore.authenticate()
        await sequelizeStore.sync()
        app.listen(PORT, () => console.log(`Server started on ${PORT}`))
    } catch (e) {
        console.log(e)
    }
})()