const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const oracledb = require('oracledb')

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

const userLogin = (req, res, next) => {}

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

// const getUserByEmail = async (req, res, next) => {
//     try {
//         let connection
//         try {
//             connection = await oracledb.getConnection()

//             const result = await connection.execute(
//                 `begin rent_package.GetUserByEmail(:email, :user); end;`,
//                 {
//                     email: req.params.email,
//                     user: {
//                         dir: oracledb.BIND_OUT,
//                         type: oracledb.CURSOR,
//                         outFormat: oracledb.OUT_FORMAT_OBJECT,
//                     },
//                 }
//             )

//             const resultSet = result.outBinds.user
//             const user = await resultSet.getRows(1)
//             await resultSet.close()

//             if (!user.length)
//                 return res.status(400).json({ error: 'no such user' })
//             return res.status(200).json({
//                 id: user[0],
//                 email: user[1],
//                 password_hash: user[2],
//             })
//         } catch (err) {
//             throw err
//         } finally {
//             if (connection) {
//                 try {
//                     await connection.close()
//                 } catch (err) {
//                     throw err
//                 }
//             }
//         }
//     } catch (err) {
//         console.error(err)
//         return res.status(400)
//     }
// }

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
