const express = require('express')
const orderController = require('../controllers/orderController')

const router = express.Router()

router.get('/', orderController.getAll)
router.get('/:id', orderController.getById)
router.post('/', orderController.add)

module.exports = router
