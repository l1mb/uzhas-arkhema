const orderRepository = require('../repositories/orderRepository')
const { status } = require('../config/orderStatuses')

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

const approve = async (req, res, next) => {
    try {
        const { keys } = req.body
        for await (const id of keys)
            orderRepository.changeStatus(id, status.approved)

        return res.status(204).send()
    } catch (err) {
        next(err)
    }
}

const reject = async (req, res, next) => {
    try {
        const { keys } = req.body
        for await (const id of keys)
            orderRepository.changeStatus(id, status.rejected)

        return res.status(204).send()
    } catch (err) {
        next(err)
    }
}

module.exports = {
    add,
    getAll,
    getById,
    approve,
    reject,
}
