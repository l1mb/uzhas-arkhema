const pickupsRepository = require('../repositories/pickupsRepository')

const add = async (req, res, next) => {
    try {
        const added = await pickupsRepository.add(...Object.values(req.body))

        res.status(201).json(added)
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
