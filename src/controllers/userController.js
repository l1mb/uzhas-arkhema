const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { jwtSecret } = require('../config/environment')
const userRepository = require('../repositories/userRepository')

const userRegister = async (req, res, next) => {
    try {
        const { username, email, password } = req.body
        const passwordHash = await bcrypt.hash(password, 10)

        const addedUser = await userRepository.add(
            username,
            email,
            passwordHash
        )

        res.status(201).json(addedUser)
    } catch (err) {
        next(err)
    }
}

const userLogin = async (req, res, next) => {
    try {
        const { username, password } = req.body

        const user = await userRepository.getByUsername(username)

        if (bcrypt.compareSync(password, user.passwordHash)) {
            const token = jwt.sign(user, jwtSecret, {
                expiresIn: '1d',
            })

            return res.status(200).json({ user, token })
        } else {
            throw new Error('wrong password')
        }
    } catch (err) {
        next(err)
    }
}

const getUser = async (req, res, next) => {
    if (req.headers && req.headers.authorization) {
        var authorization = req.headers.authorization.split(' ')[1],
            decoded
        try {
            decoded = jwt.verify(authorization, jwtSecret)
        } catch (e) {
            return res.status(401).send('unauthorized')
        }
        const user = {
            username: decoded.username,
            email: decoded.email,
        }
        return res.status(200).json(user)
    }

    return res.send(500)
}

const getAllUsers = async (_, res, next) => {
    try {
        const users = await userRepository.getAll()
        return res.status(200).json(users)
    } catch (err) {
        next(err)
    }
}

module.exports = {
    userLogin,
    userRegister,
    getAllUsers,
    getUser,
}
