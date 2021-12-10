const express = require('express')
const router = express.Router()
const { products } = require('../roles.js')

router.get('/', (req, res) => {
    res.json(projects)
})

router.get('/:productId', setProduct, (req, res) => {
    res.json(req.product)
})

function setProduct(req, res, next) {
    const productId = parseInt(req.params.productId)
    req.product = products.find((product) => product.id === productId)

    if (req.product == null) {
        res.status(404)
        return res.send('product not found')
    }
    next()
}

module.exports = router
