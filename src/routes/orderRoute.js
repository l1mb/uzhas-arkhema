const express = require('express')
const checkAuth = require('../middleware/checkAuth')
const orderController = require('../controllers/orderController')

const router = express.Router()

router.get('/', orderController.getAll)
router.get('/:id', orderController.getById)
router.post('/', orderController.add)
router.post('/approve', checkAuth.isAdmin, orderController.approve)
router.post('/reject', checkAuth.isAdmin, orderController.reject)

module.exports = router
