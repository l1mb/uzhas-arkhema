const jwt = require('jsonwebtoken')
const { jwtSecret } = require('../config/environment')

module.exports = (req, res, next) => {
    const token = req.header('auth-token')
    if (!token) return res.status(403).json({ error: 'access denied' })

    try {
        const verified = jwt.verify(token, jwtSecret)
        req.user = verified
        next()
    } catch (err) {
        res.status(403).json({ error: 'auth failed' })
    }
}
