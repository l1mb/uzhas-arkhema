const express = require('express')
const manufacturerController = require('../controllers/manufacturerController')

const router = express.Router()

router.get('/', manufacturerController.getAll)
router.post('/', manufacturerController.add)

module.exports = router
