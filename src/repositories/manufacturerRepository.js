const oracledb = require('oracledb')
const { keysToCamel } = require('./utils')

module.exports.getAll = async () => {
    try {
        let connection
        try {
            connection = await oracledb.getConnection()
            oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT

            const result = await connection.execute(
                `begin cender_manufacturers.get_all(:manufacturers); end;`,
                {
                    manufacturers: {
                        dir: oracledb.BIND_OUT,
                        type: oracledb.CURSOR,
                    },
                }
            )

            const resultSet = result.outBinds.manufacturers
            const manufacturers = await resultSet.getRows()
            await resultSet.close()

            return manufacturers.map((x) => keysToCamel(x))
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
                `begin cender_manufacturers.get_by_id(:id, :manufacturer); end;`,
                {
                    id,
                    manufacturer: {
                        dir: oracledb.BIND_OUT,
                        type: oracledb.CURSOR,
                    },
                }
            )

            const resultSet = result.outBinds.manufacturer
            const manufacturer = keysToCamel((await resultSet.getRows(1))[0])
            await resultSet.close()

            if (!manufacturer) throw new Error('manufacturer not found')

            return manufacturer
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



module.exports.createNews = async (
    mnfrId, news
) => {
    try {
        let connection
        try {
            connection = await oracledb.getConnection()
            oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT
            console.log("i can reach post " + mnfrId +" " + news)
            const result = await connection.execute(
                `begin cender_news.create_news(:mnfrId, :news); end;`,
                {
                    mnfrId,
                    news
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



module.exports.updateNews = async (
    newsId, news
) => {
    try {
        let connection
        try {
            connection = await oracledb.getConnection()
            oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT
            console.log("i can reach update " + newsId +" " + news)

            const result = await connection.execute(
                `begin cender_news.update_news(:newsId, :news); end;`,
                {
                    newsId, 
                    news
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

module.exports.deleteNewsById = async (
    newsId
) => {
    try {
        let connection
        try {
            connection = await oracledb.getConnection()
            oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT
            console.log("i can reach delete " + newsId )

            await connection.execute(
                `begin cender_news.delete_news(:newsId); end;`,
                {
                    newsId
                }
            )

            console.log("suka")
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


