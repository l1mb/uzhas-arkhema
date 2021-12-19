const productRepository = require('../repositories/productRepository')
const cloudinary = require('cloudinary').v2
const { placeholderImgUrl } = require('../config/environment')

const add = async (req, res, next) => {
    try {
        const { name, description, price, categoryId, vendorId } = req.fields
        const { logo } = req.files

        const img = await cloudinary.uploader.upload(logo.path)

        const added = await productRepository.add(
            name,
            description,
            price,
            categoryId,
            vendorId,
            img.url
        )

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

const getProductsCount = async (_, res, next) => {
    try {
        const count = await productRepository.getCount()
        return res.status(200).json({ count })
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

const updateById = async (req, res, next) => {
    try {
        const { name, description, price, categoryId, vendorId } = req.fields
        const { logo } = req.files

        const img = await cloudinary.uploader.upload(logo.path)

        const updated = await productRepository.updateById(
            id,
            name,
            description,
            price,
            categoryId,
            vendorId,
            img.url
        )

        return res.status(201).json(updated)
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
