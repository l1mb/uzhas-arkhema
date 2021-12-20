const express = require('express')
const orderController = require('../controllers/orderController')

const router = express.Router()

router.post('/', orderController.add)
router.put('/', orderController.updateById)
router.get('/', orderController.getAll)
router.get('/:id', orderController.getById)
router.delete('/:id', orderController.deleteById)
router.post('/complete', orderController.complete)

module.exports = router
