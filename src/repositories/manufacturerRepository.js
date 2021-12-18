const oracledb = require('oracledb')
const { keysToCamel } = require('./utils')

module.exports.add = async (name) => {
    try {
        let connection
        try {
            connection = await oracledb.getConnection()
            oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT

            const result = await connection.execute(
                `begin cender_vendors.add(:name, :added); end;`,
                {
                    name,
                    added: {
                        dir: oracledb.BIND_OUT,
                        type: oracledb.CURSOR,
                    },
                }
            )

            const resultSet = result.outBinds.added
            const vendor = keysToCamel((await resultSet.getRows(1))[0])
            await resultSet.close()

            return vendor
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
                `begin cender_vendors.get_all(:vendors); end;`,
                {
                    vendors: {
                        dir: oracledb.BIND_OUT,
                        type: oracledb.CURSOR,
                    },
                }
            )

            const resultSet = result.outBinds.vendors
            const vendors = await resultSet.getRows()
            await resultSet.close()

            return vendors.map((x) => keysToCamel(x))
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
