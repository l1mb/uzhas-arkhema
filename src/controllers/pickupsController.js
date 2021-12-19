const pickupsRepository = require('../repositories/pickupsRepository')

const add = async (req, res, next) => {
    try {
        const { name } = req.fields
        await pickupsRepository.add(name)

        res.status(201).json('added pickup')
    } catch (err) {
        next(err)
    }
}

const getAll = async (_, res, next) => {
    try {
        const pickups = await pickupsRepository.getAll()
        return res.status(200).json(pickups)
    } catch (err) {
        next(err)
    }
}

module.exports = {
    add,
    getAll,
}
