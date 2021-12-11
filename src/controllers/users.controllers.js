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
                `begin rent_package.AddUser(:username, :email, :password_hash); end;`,
                {
                    username: username,
                    email: email,
                    password_hash: password_hash,
                }
            )
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
    }

    res.status(200).json(req.body)
}

const userLogin = async (req, res, next) => {
    try {
        let connection
        try {
            connection = await oracledb.getConnection()

            const { username, password } = req.body
            oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT
            const result = await connection.execute(
                `begin rent_package.GetUserByUsername(:username, :user); end;`,
                {
                    username: username,
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
                return res.status(400).json({ error: 'user not found' })

            bcrypt.compare(password, user[0].passwordHash, (err, result) => {
                if (err) throw err
                if (result) {
                    const token = jwt.sign(user[0], jwtSecret, {
                        expiresIn: '1d',
                    })
                    return res.status(200).json({ user: user[0], token: token })
                }
            })
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
        return res.status(400)
    }
}

const getAllUsers = async (req, res, next) => {
    try {
        let connection
        try {
            connection = await oracledb.getConnection()

            oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT
            const result = await connection.execute(
                `begin rent_package.GetAllUsers(:users); end;`,
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
        return res.status(400)
    }
}

const getMe = async (req, res) => {
    const userId = req.user.userId

    // get user from db by id
    res.status(200).json({
        id: 1,
        name: 'yan korzun',
    })
}

module.exports = {
    userLogin,
    userRegister,
    getMe,
    getAllUsers,
}
