const express = require('express')
const checkAuth = require('../middleware/checkAuth')
const vendorController = require('../controllers/vendorController')

const router = express.Router()

router.get('/', vendorController.getAll)
router.post('/add', vendorController.add)

module.exports = router
