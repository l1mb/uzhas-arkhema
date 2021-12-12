const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const oracledb = require('oracledb')
const { jwtSecret } = require('../config/environment')

const userRegister = async (req, res, next) => {
    try {
        let connection
        try {
            connection = await oracledb.getConnection()

            const { username, email, password } = req.body
            const password_hash = await bcrypt.hash(password, 10)

            await connection.execute(
                `begin rent_users.AddUser(:username, :email, :password_hash); end;`,
                {
                    username,
                    email,
                    password_hash,
                }
            )

            res.status(201).json(req.body)
        } catch (err) {
            if (err.errorNum === 1) {
                return res
                    .status(400)
                    .json({ error: 'user already registered' })
            } else {
                throw err
            }
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
        return res.status(500).json({ error: err.message })
    }
}

const userLogin = async (req, res, next) => {
    try {
        let connection
        try {
            connection = await oracledb.getConnection()

            const { username, password } = req.body
            oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT
            const result = await connection.execute(
                `begin rent_users.GetUserByUsername(:username, :user); end;`,
                {
                    username,
                    user: {
                        dir: oracledb.BIND_OUT,
                        type: oracledb.CURSOR,
                    },
                }
            )

            const resultSet = result.outBinds.user
            const user = await resultSet.getRows(1)
            await resultSet.close()

            if (user.length <= 0)
                return res.status(401).json({ error: 'user not found' })

            if (bcrypt.compareSync(password, user[0].passwordHash)) {
                const token = jwt.sign(user[0], jwtSecret, {
                    expiresIn: '1d',
                })
                return res.status(200).json({ user: user[0], token })
            } else {
                return res.status(401).json({ error: 'wrong password' })
            }
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
        return res.status(500).json({ error: err.message })
    }
}

const getAllUsers = async (req, res, next) => {
    try {
        let connection
        try {
            connection = await oracledb.getConnection()

            oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT
            const result = await connection.execute(
                `begin rent_users.GetAllUsers(:users); end;`,
                {
                    users: {
                        dir: oracledb.BIND_OUT,
                        type: oracledb.CURSOR,
                    },
                }
            )

            const resultSet = result.outBinds.users
            const users = await resultSet.getRows()
            await resultSet.close()

            return res.status(200).json(users)
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
        return res.status(500).json({ error: err.message })
    }
}

module.exports = {
    userLogin,
    userRegister,
    getAllUsers,
}
