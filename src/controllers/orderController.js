const orderRepository = require('../repositories/orderRepository')

const add = async (req, res, next) => {
    try {
        const added = await orderRepository.add(...Object.values(req.body))

        res.status(201).json(added)
    } catch (err) {
        next(err)
    }
}

const getAll = async (req, res, next) => {
    try {
        const orders = await orderRepository.getAll()
        return res.status(200).json(orders)
    } catch (err) {
        next(err)
    }
}

const getById = async (req, res, next) => {
    try {
        const { id } = req.params
        const order = await orderRepository.getById(id)

        return res.status(200).json(order)
    } catch (err) {
        next(err)
    }
}

module.exports = {
    add,
    getAll,
    getById,
}
