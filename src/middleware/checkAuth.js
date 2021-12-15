const jwt = require('jsonwebtoken')
const { roles } = require('../config/roles')
const { jwtSecret } = require('../config/environment')

module.exports.isAdmin = (req, res, next) => {
    try {
        const token = req.header('Authorization').split(' ')[1]
        if (!token) throw new Error('auth failed')

        const verified = jwt.verify(token, jwtSecret)
        if (verified.role !== roles.admin) throw new Error('access denied')

        req.headers['user'] = verified
        next()
    } catch (err) {
        res.status(403).json({ error: err.message })
    }
}
