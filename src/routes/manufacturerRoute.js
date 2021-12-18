const express = require('express')
const manufacturerController = require('../controllers/manufacturerController')

const router = express.Router()

router.get('/', manufacturerController.getAll)
router.get('/:id', manufacturerController.getById)

module.exports = router
