const express = require('express')
const checkAuth = require('../middleware/checkAuth')
const userController = require('../controllers/userController')

const router = express.Router()

router.get('/', userController.getAll)
router.post('/sign-up', userController.register)
router.post('/login', userController.login)
router.get('/current', checkAuth.isAdmin, userController.getUser)

module.exports = router
