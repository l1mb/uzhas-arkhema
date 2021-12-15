const express = require('express')
const productController = require('../controllers/productController')

const router = express.Router()

router.get('/', productController.getAll)
router.get('/:id', productController.getById)
router.delete('/:id', productController.deleteById)
router.put('/', productController.updateById)
router.post('/', productController.add)

module.exports = router
