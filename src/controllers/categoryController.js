const categoryRepository = require('../repositories/categoryRepository')

const add = async (req, res, next) => {
    try {
        const added = await categoryRepository.add(...Object.values(req.body))

        res.status(201).json(added)
    } catch (err) {
        next(err)
    }
}

const getAll = async (_, res, next) => {
    try {
        const categories = await categoryRepository.getAll()
        return res.status(200).json(categories)
    } catch (err) {
        next(err)
    }
}

module.exports = {
    add,
    getAll,
}
