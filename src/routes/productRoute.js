const express = require('express')
const productController = require('../controllers/productController')

const router = express.Router()

router.post('/', productController.add)
router.put('/', productController.updateById)
router.get('/', productController.getAll)
router.get('/pages', productController.getPages)
router.get('/:id', productController.getById)
router.delete('/:id', productController.deleteById)

module.exports = router
