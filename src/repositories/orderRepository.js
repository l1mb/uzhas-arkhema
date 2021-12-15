const oracledb = require('oracledb')
const { keysToCamel } = require('./utils')

module.exports.add = async (
    user_id,
    product_id,
    phone,
    rent_start_date,
    rent_end_date
) => {
    try {
        let connection
        try {
            connection = await oracledb.getConnection()
            oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT

            const result = await connection.execute(
                `begin rent_orders.add(:user_id, :product_id, :phone, :rent_start_date, :rent_end_date, :added); end;`,
                {
                    user_id,
                    product_id,
                    phone,
                    rent_start_date,
                    rent_end_date,
                    added: {
                        dir: oracledb.BIND_OUT,
                        type: oracledb.CURSOR,
                    },
                }
            )

            const resultSet = result.outBinds.added
            const order = keysToCamel((await resultSet.getRows(1))[0])
            await resultSet.close()

            return order
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
                `begin rent_orders.get_all(:orders); end;`,
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
                `begin rent_orders.get_by_id(:id, :order); end;`,
                {
                    id,
                    order: {
                        dir: oracledb.BIND_OUT,
                        type: oracledb.CURSOR,
                    },
                }
            )

            const resultSet = result.outBinds.order
            const order = keysToCamel((await resultSet.getRows(1))[0])
            await resultSet.close()

            if (!order) throw new Error('order not found')

            return order
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
