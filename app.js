const express = require('express')
const oracledb = require('oracledb')
const dotenv = require('dotenv')

const app = express()
const port = process.env.PORT || 5000

app.get('/', (req, res) => {
    res.send('home')
})
app.get('/users', (req, res) => getAllUsers(req, res))

app.get('/user/:id', (req, res) => getUserById(req, res))

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})

const env = dotenv.config()
if (env.error) {
    console.error('specify db connection parameters in .env file')
    process.exit(1)
}

const threadpoolSize = parseInt(process.env.UV_THREADPOOL_SIZE)
const dbSettings = {
    user: env.parsed.USERNAME,
    password: env.parsed.PASSWORD,
    connectionString: env.parsed.URL,
    poolIncrement: threadpoolSize ? 0 : 1,
    poolMin: threadpoolSize || 0,
    poolMax: threadpoolSize || 4,
}

async function init() {
    try {
        await oracledb.createPool(dbSettings)

        // await run()
    } catch (err) {
        console.error(err.message)
    } finally {
        await closePoolAndExit()
    }
}

async function run() {
    try {
        let connection
        try {
            connection = await oracledb.getConnection()

            const rs = await connection.execute(
                `begin rent_package.GetUserByUsername(:username, :id); end;`,
                {
                    username: 'шо',
                    id: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
                }
            )

            console.log(rs.outBinds)
        } catch (err) {
            throw err
        } finally {
            if (connection) {
                try {
                    await connection.close()
                } catch (err) {
                    throw err
                }
            }
        }
    } catch (err) {
        console.error(err)
    }
}

async function closePoolAndExit() {
    try {
        await oracledb.getPool().close(10)
        process.exit(0)
    } catch (err) {
        console.error(err.message)
        process.exit(1)
    }
}

process.once('SIGTERM', closePoolAndExit).once('SIGINT', closePoolAndExit)

init()

async function getAllUsers(req, res) {
    let result
    try {
        connection = await pool.getConnection()

        result = await connection.execute(`begin rent_package.GetAllUsers()`)
        console.log(result)
    } catch (err) {
        return res.send(err.message)
    } finally {
        if (connection) {
            try {
                await connection.close()
            } catch (err) {
                console.error(err.message)
            }
        }

        return result.rows.length ? res.send(result.rows) : res.send('no users')
    }
}

async function getUserById(req, res) {
    res.send(req.params.id)
}
