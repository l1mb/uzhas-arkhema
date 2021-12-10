const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const oracledb = require('oracledb')

const userRegister = async (req, res, next) => {
    try {
        let connection
        try {
            connection = await oracledb.getConnection()

            const { email, password } = req.body
            const password_hash = await bcrypt.hash(password, 10)

            await connection.execute(
                `begin rent_package.AddUser(:email, :password_hash); end;`,
                [email, password_hash],
                {
                    bindDefs: [
                        {
                            type: oracledb.DB_TYPE_VARCHAR,
                            type: oracledb.DB_TYPE_VARCHAR,
                        },
                    ],
                }
            )
        } catch (err) {
            if (err.errorNum === 1) {
                return res
                    .status(400)
                    .json({ error: 'email already registered' })
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

const userLogin = (req, res, next) => {
    // get user from db
    res.status(200).json({
        id: 1,
        name: 'yan korzun',
    })
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
}
