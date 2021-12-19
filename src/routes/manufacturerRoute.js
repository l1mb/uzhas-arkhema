const express = require('express')
const manufacturerController = require('../controllers/manufacturerController')

const router = express.Router()

router.get('/', manufacturerController.getAll)
router.post('/news/', manufacturerController.postNews)
router.put('/news/', manufacturerController.putNews)
router.delete('/news/:id', manufacturerController.deleteNews)


router.get('/:id', manufacturerController.getById)

module.exports = router
