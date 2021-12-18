const express = require('express')
const checkAuth = require('../middleware/checkAuth')
const pickupsController = require('../controllers/pickupsController')

const router = express.Router()

router.get('/', pickupsController.getAll)
router.post('/', pickupsController.add)

module.exports = router
