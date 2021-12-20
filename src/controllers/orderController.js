const orderRepository = require('../repositories/orderRepository')

const add = async (req, res, next) => {
    try {
        const { userId, productId, count } = req.fields
        await orderRepository.add(userId, productId, count)

        res.status(201).send('added order')
    } catch (err) {
        next(err)
    }
}

const updateById = async (req, res, next) => {
    try {
        const { id, userId, productId, count } = req.fields
        await orderRepository.updateById(id, userId, productId, count)

        res.status(200).send('updated order')
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

const deleteById = async (req, res, next) => {
    try {
        const { id } = req.params
        await orderRepository.deleteById(id)

        return res.status(200).send('deleted')
    } catch (err) {
        next(err)
    }
}

const complete = async (req, res, next) => {
    try {
        const { keys } = req.fields
        for await (const id of keys)
            orderRepository.changeStatus(id, 'completed')

        return res.status(204).send()
    } catch (err) {
        next(err)
    }
}
module.exports = {
    add,
    updateById,
    getAll,
    getById,
    deleteById,
    complete,
}
