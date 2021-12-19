const oracledb = require('oracledb')
const { keysToCamel } = require('./utils')
const date = require('date-and-time')

module.exports.add = async (userId, productId, count) => {
    try {
        let connection
        try {
            connection = await oracledb.getConnection()
            oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT

            await connection.execute(
                `begin cender_orders.add(:userId, :productId, :count); end;`,
                {
                    userId,
                    productId,
                    count,
                }
            )
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

module.exports.updateById = async (id, userId, productId, count) => {
    try {
        let connection
        try {
            connection = await oracledb.getConnection()
            oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT

            await connection.execute(
                `begin cender_orders.add(:id, :userId, :productId, :count); end;`,
                {
                    id,
                    userId,
                    productId,
                    count,
                }
            )
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
                `begin cender_orders.get_all(:orders); end;`,
                {
                    orders: {
                        dir: oracledb.BIND_OUT,
                        type: oracledb.CURSOR,
                    },
                }
            )

            const resultSet = result.outBinds.orders
            const orders = await resultSet.getRows()
            await resultSet.close()

            orders.forEach(
                (x) => (x.ORDER_DATE = date.format(x.ORDER_DATE, 'DD.MM.YY'))
            )

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

module.exports.getById = async (id) => {
    try {
        let connection
        try {
            connection = await oracledb.getConnection()
            oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT

            const result = await connection.execute(
                `begin cender_orders.get_by_id(:id, :order); end;`,
                {
                    id,
                    order: {
                        dir: oracledb.BIND_OUT,
                        type: oracledb.CURSOR,
                    },
                }
            )

            const resultSet = result.outBinds.order
            const order = (await resultSet.getRows(1))[0]
            order.ORDER_DATE = date.format(order.ORDER_DATE, 'DD.MM.YY')
            await resultSet.close()

            if (!order) throw new Error('order not found')

            return keysToCamel(order)
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

module.exports.deleteById = async (id) => {
    try {
        let connection
        try {
            connection = await oracledb.getConnection()
            oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT

            await connection.execute(
                `begin cender_orders.delete_by_id(:id); end;`,
                { id }
            )
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
