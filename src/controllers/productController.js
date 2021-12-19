const productRepository = require('../repositories/productRepository')
const cloudinary = require('cloudinary').v2

const add = async (req, res, next) => {
    try {
        const { name, description, price, mnfrId, shape, pickUpId } = req.fields
        const { logo } = req.files

        let url = ''
        if (logo) {
            const img = await cloudinary.uploader.upload(logo.path)
            url = img.url
        }

        await productRepository.add(
            name,
            description,
            url,
            price,
            mnfrId,
            shape,
            pickUpId
        )

        res.status(201).send('added')
    } catch (err) {
        next(err)
    }
}

const updateById = async (req, res, next) => {
    try {
        const { id, name, description, price, mnfrId, shape, pickUpId } =
            req.fields
        const { logo } = req.files

        const url = ''
        if (logo) {
            const img = await cloudinary.uploader.upload(logo.path)
            url = img.url
        }

        await productRepository.updateById(
            id,
            name,
            description,
            url,
            price,
            mnfrId,
            shape,
            pickUpId
        )

        return res.status(201).json('updated')
    } catch (err) {
        next(err)
    }
}

const getById = async (req, res, next) => {
    try {
        const { id } = req.params
        const product = await productRepository.getById(id)
        product.imgUrl = product.imgUrl || placeholderImgUrl

        return res.status(200).json(product)
    } catch (err) {
        next(err)
    }
}

const getAll = async (req, res, next) => {
    try {
        const { offset, limit, filterby, query, orderby, mode } = req.query
        const products = await productRepository.getAll(
            offset,
            limit,
            filterby,
            query,
            orderby,
            mode
        )
        products.forEach((p) => (p.imgUrl = p.imgUrl || placeholderImgUrl))

        return res.status(200).json(products)
    } catch (err) {
        next(err)
    }
}

const deleteById = async (req, res, next) => {
    try {
        const { id } = req.params
        await productRepository.deleteById(id)

        return res.status(200).json('deleted')
    } catch (err) {
        next(err)
    }
}

const getProductsCount = async (_, res, next) => {
    try {
        const count = await productRepository.getCount()
        return res.status(200).json({ count })
    } catch (err) {
        next(err)
    }
}

module.exports = {
    add,
    deleteById,
    getAll,
    getById,
    updateById,
    getProductsCount,
}
