const vendorRepository = require('../repositories/vendorRepository')

const add = async (req, res, next) => {
    try {
        const added = await vendorRepository.add(...Object.values(req.body))

        res.status(201).json(added)
    } catch (err) {
        next(err)
    }
}

const getAll = async (_, res, next) => {
    try {
        const vendors = await vendorRepository.getAll()
        return res.status(200).json(vendors)
    } catch (err) {
        next(err)
    }
}

module.exports = {
    add,
    getAll,
}
