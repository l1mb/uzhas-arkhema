const productRepository = require('../repositories/productRepository')

const add = async (req, res, next) => {
    try {
        const added = await productRepository.add(...Object.values(req.body))

        res.status(201).json(added)
    } catch (err) {
        next(err)
    }
}

const deleteById = async (req, res, next) => {
    try {
        const { id } = req.params
        const deleted = await productRepository.deleteById(id)

        return res.status(200).json(deleted)
    } catch (err) {
        next(err)
    }
}

const getAll = async (req, res, next) => {
    try {
        const { offset, limit, orderby, mode } = req.query
        const products = await productRepository.getAll(
            offset,
            limit,
            orderby,
            mode
        )
        return res.status(200).json(products)
    } catch (err) {
        next(err)
    }
}

const getById = async (req, res, next) => {
    try {
        const { id } = req.params
        const products = await productRepository.getById(id)

        return res.status(200).json(products)
    } catch (err) {
        next(err)
    }
}

module.exports = {
    add,
    deleteById,
    getAll,
    getById,
}
