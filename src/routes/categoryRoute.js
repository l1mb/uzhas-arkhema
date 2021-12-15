const express = require('express')
const checkAuth = require('../middleware/checkAuth')
const categoryController = require('../controllers/categoryController')

const router = express.Router()

router.get('/', categoryController.getAll)
router.post('/', categoryController.add)

module.exports = router
