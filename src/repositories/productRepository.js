const oracledb = require('oracledb')
const { keysToCamel } = require('./utils')

module.exports.add = async (
    name,
    description,
    price,
    category_id,
    vendor_id
) => {
    try {
        let connection
        try {
            connection = await oracledb.getConnection()
            oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT

            const result = await connection.execute(
                `begin rent_products.add(:name, :description, :price,
                    :category_id, :vendor_id, :added); end;`,
                {
                    name,
                    description,
                    price,
                    category_id,
                    vendor_id,
                    added: {
                        dir: oracledb.BIND_OUT,
                        type: oracledb.CURSOR,
                    },
                }
            )

            const resultSet = result.outBinds.added
            const product = keysToCamel((await resultSet.getRows(1))[0])
            await resultSet.close()

            return product
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

module.exports.getAll = async (
    offset = 0,
    limit = -1,
    order_by = 'id',
    order_mode = 'asc'
) => {
    try {
        let connection
        try {
            connection = await oracledb.getConnection()
            oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT

            const result = await connection.execute(
                `begin rent_products.get_all(:offset, :limit, :order_by,
                    :order_mode, :products); end;`,
                {
                    offset,
                    limit,
                    order_by,
                    order_mode,
                    products: {
                        dir: oracledb.BIND_OUT,
                        type: oracledb.CURSOR,
                    },
                }
            )

            const resultSet = result.outBinds.products
            const products = await resultSet.getRows()
            await resultSet.close()

            return products.map((x) => keysToCamel(x))
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
                `begin rent_products.get_by_id(:id, :product); end;`,
                {
                    id,
                    product: {
                        dir: oracledb.BIND_OUT,
                        type: oracledb.CURSOR,
                    },
                }
            )

            const resultSet = result.outBinds.product
            const product = keysToCamel((await resultSet.getRows(1))[0])
            await resultSet.close()

            if (!product) throw new Error('product not found')

            return product
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

            const result = await connection.execute(
                `begin rent_products.delete_by_id(:id, :deleted); end;`,
                {
                    id,
                    deleted: {
                        dir: oracledb.BIND_OUT,
                        type: oracledb.CURSOR,
                    },
                }
            )

            const resultSet = result.outBinds.deleted
            const product = keysToCamel((await resultSet.getRows(1))[0])
            await resultSet.close()

            if (!product) throw new Error('product not found')

            return product
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

module.exports.updateById = async (
    id,
    name,
    description,
    price,
    category_id,
    vendor_id
) => {
    try {
        let connection
        try {
            connection = await oracledb.getConnection()
            oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT

            const result = await connection.execute(
                `begin rent_products.update_by_id(:id, :name, :description,
                    :price, :category_id, :vendor_id, :updated); end;`,
                {
                    id,
                    name,
                    description,
                    price,
                    category_id,
                    vendor_id,
                    updated: {
                        dir: oracledb.BIND_OUT,
                        type: oracledb.CURSOR,
                    },
                }
            )

            const resultSet = result.outBinds.updated
            const product = keysToCamel((await resultSet.getRows(1))[0])
            await resultSet.close()

            if (!product) throw new Error('product not found')

            return product
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
