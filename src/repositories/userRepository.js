const oracledb = require('oracledb')

const toCamel = (s) => {
    return s.toLowerCase().replace(/([_][a-z])/gi, ($1) => {
        return $1.toUpperCase().replace('_', '')
    })
}

const isArray = (a) => Array.isArray(a)

const isObject = (o) =>
    o === Object(o) && !isArray(o) && typeof o !== 'function'

const keysToCamel = (o) => {
    if (isObject(o)) {
        const n = {}

        Object.keys(o).forEach((k) => {
            n[toCamel(k)] = keysToCamel(o[k])
        })

        return n
    } else if (isArray(o)) {
        return o.map((i) => {
            return keysToCamel(i)
        })
    }

    return o
}

module.exports.add = async (username, email, passwordHash) => {
    try {
        let connection
        try {
            connection = await oracledb.getConnection()
            oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT

            const result = await connection.execute(
                `begin rent_users.AddUser(:username, :email, :passwordHash, :addedUser); end;`,
                {
                    username,
                    email,
                    passwordHash,
                    addedUser: {
                        dir: oracledb.BIND_OUT,
                        type: oracledb.CURSOR,
                    },
                }
            )

            const resultSet = result.outBinds.addedUser
            const user = keysToCamel((await resultSet.getRows(1))[0])
            await resultSet.close()

            return user
        } catch (err) {
            if (err.errorNum === 1) throw new Error('user already registered')
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
        throw err
    }
}

module.exports.getByUsername = async (username) => {
    try {
        let connection
        try {
            connection = await oracledb.getConnection()
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
            const user = keysToCamel((await resultSet.getRows(1))[0])
            await resultSet.close()

            if (!user) throw new Error('user not found')

            user.role = 'admin'
            return user
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
        throw err
    }
}

module.exports.getAll = async () => {
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

            return users.map((x) => keysToCamel(x))
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
        throw err
    }
}
