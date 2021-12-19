const bodyParser = require('body-parser')
const cloudinary = require('cloudinary').v2
const express = require('express')
const formidable = require('express-formidable')
const oracledb = require('oracledb')
const { port, dbConfig, cloudinaryConfig } = require('./config/environment')

const userRouter = require('./routes/userRoute')
const productRouter = require('./routes/productRoute')
const vendorRouter = require('./routes/vendorRoute')
const categoryRouter = require('./routes/categoryRoute')
const orderRouter = require('./routes/orderRoute')

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(formidable())

app.use('/api/users', userRouter)
app.use('/api/products', productRouter)
app.use('/api/vendors', vendorRouter)
app.use('/api/categories', categoryRouter)
app.use('/api/orders', orderRouter)

app.use((req, res, next) => {
    res.status(err.status || 404).json({
        error: 'route not found',
    })
})

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        error: err.message || 'internal server error',
    })
})

cloudinary.config(cloudinaryConfig)

const server = app.listen(port, () => {
    console.log(`listening on port ${port}`)
    initDbConnectionPool()
})

async function initDbConnectionPool() {
    try {
        await oracledb.createPool(dbConfig)
    } catch (err) {
        console.error(err.message)
        process.exit(1)
    }
}

async function shutdownServer() {
    try {
        await oracledb.getPool().close(10)
        server.close()
        process.exit(0)
    } catch (err) {
        console.error(err.message)
        process.exit(1)
    }
}

process.once('SIGTERM', shutdownServer).once('SIGINT', shutdownServer)

module.exports = app
