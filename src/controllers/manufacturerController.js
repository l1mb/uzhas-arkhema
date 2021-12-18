const manufacturerRepository = require('../repositories/manufacturerRepository')

const add = async (req, res, next) => {
    try {
        const added = await manufacturerRepository.add(
            ...Object.values(req.body)
        )

        res.status(201).json(added)
    } catch (err) {
        next(err)
    }
}

const getAll = async (_, res, next) => {
    try {
        const manufacturers = await manufacturerRepository.getAll()
        return res.status(200).json(manufacturers)
    } catch (err) {
        next(err)
    }
}

module.exports = {
    add,
    getAll,
}
