const express = require('express')
const oracledb = require('oracledb')
const dotenv = require('dotenv')
const { users } = require('./roles')
const productRouter = require('./routes/products')

const app = express()

const env = dotenv.config()
if (env.error) {
    console.error('specify db connection parameters in .env file')
    process.exit(1)
}

const dbSettings = {
    user: env.parsed.USERNAME,
    password: env.parsed.PASSWORD,
    connectionString: env.parsed.URL,
}

app.use(express.json())
app.use(setUser)
app.use('/products', productRouter)

app.get('/', (req, res) => {
    res.send('home page')
})

app.get('/dashboard', (req, res) => {
    res.send('dashboard page')
})

app.get('/admin', (req, res) => {
    res.send('admin page')
})

function setUser(req, res, next) {
    const userId = req.body.userId
    if (userId) {
        req.user = users.find((user) => user.id === usedId)
    }
    next()
}

async function init() {
    try {
        await oracledb.createPool(dbSettings)
    } catch (err) {
        console.error(err)
    }
}

app.listen(5000)
