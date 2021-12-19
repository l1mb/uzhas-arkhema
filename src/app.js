const express = require('express')
const oracledb = require('oracledb')
const formidable = require('express-formidable')
const cloudinary = require('cloudinary')
const { port, dbSettings, cloudinaryConfig } = require('./config/environment')

const userRouter = require('./routes/userRoute')
const productRouter = require('./routes/productRoute')
const manufacturerRouter = require('./routes/manufacturerRoute')
const pickupsRouter = require('./routes/pickupsRoute')
const orderRouter = require('./routes/orderRoute')

const app = express()
app.use(formidable())

app.use('/api/users', userRouter)
app.use('/api/products', productRouter)
app.use('/api/manufacturers', manufacturerRouter)
app.use('/api/pickups', pickupsRouter)
app.use('/api/orders', orderRouter)

app.use((req, res, next) => {
    res.status(err.status || 404).json({
        error: 'route not found',
    })
})

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        error: err.message,
    })
})

cloudinary.config(cloudinaryConfig)

const server = app.listen(port, () => {
    console.log(`listening on port ${port}`)
    initDbConnectionPool()
})

async function initDbConnectionPool() {
    try {
        await oracledb.createPool(dbSettings)
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
