const express = require('express')
const checkAuth = require('../middleware/checkAuth')
const productController = require('../controllers/productController')

const router = express.Router()

router.get('/', productController.getAll)
router.get('/:id', productController.getById)
router.post('/add', productController.add)

module.exports = router
