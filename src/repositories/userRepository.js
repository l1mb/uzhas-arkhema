const oracledb = require('oracledb')
const { keysToCamel } = require('./utils')

module.exports.add = async (username, email, passwordHash) => {
    try {
        let connection
        try {
            connection = await oracledb.getConnection()
            oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT

            const result = await connection.execute(
                `begin cender_users.add(:username, :email, :passwordHash,
                    :added); end;`,
                {
                    username,
                    email,
                    passwordHash,
                    added: {
                        dir: oracledb.BIND_OUT,
                        type: oracledb.CURSOR,
                    },
                }
            )

            const resultSet = result.outBinds.added
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

module.exports.confirmEmail = async (id) => {
    try {
        let connection
        try {
            connection = await oracledb.getConnection()
            oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT
            const result = await connection.execute(
                `begin cender_users.confirm(:id); end;`,
                {
                    id
                }
            )
        } catch (err) {
            if (err.errorNum === 1) throw new Error('problemi s dostupom k jojykazino')
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
                `begin cender_users.get_by_username(:username, :user); end;`,
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
                    console.log(`user:${user}`);
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
                `begin cender_users.get_all(:users); end;`,
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

module.exports.getOrders = async (id) => {
    try {
        let connection
        try {
            connection = await oracledb.getConnection()
            oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT

            const result = await connection.execute(
                `begin cender_users.get_orders(:id); end;`,
                {
                    id,
                    orders: {
                        dir: oracledb.BIND_OUT,
                        type: oracledb.CURSOR,
                    },
                }
            )

            const resultSet = result.outBinds.orders
            const orders = await resultSet.getRows()
            await resultSet.close()

            return orders.map((x) => keysToCamel(x))
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
