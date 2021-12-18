const manufacturerRepository = require('../repositories/manufacturerRepository')

const getAll = async (_, res, next) => {
    try {
        const manufacturers = await manufacturerRepository.getAll()
        return res.status(200).json(manufacturers)
    } catch (err) {
        next(err)
    }
}

const getById = async (_, res, next) => {
    try {
        const { id } = req.params
        const manufacturer = await manufacturerRepository.getById(id)
        return res.status(200).json(manufacturer)
    } catch (err) {
        next(err)
    }
}

module.exports = {
    getAll,
    getById,
}
