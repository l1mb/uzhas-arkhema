const manufacturerRepository = require('../repositories/manufacturerRepository')

const getAll = async (_, res, next) => {
    try {
        const manufacturers = await manufacturerRepository.getAll()
        return res.status(200).json(manufacturers)
    } catch (err) {
        next(err)
    }
}

const getById = async (_, res, next) => {
    try {
        const { id } = req.params
        const manufacturer = await manufacturerRepository.getById(id)
        return res.status(200).json(manufacturer)
    } catch (err) {
        next(err)
    }
}

const postNews = async (req, res, next) => {
    try {
        const { manufacturerId, news } = req.body
        const manufacturer = await manufacturerRepository.createNews(manufacturerId, news)
        return res.status(200).json(manufacturer)
    } catch (err) {
        next(err)
    }
}

const putNews = async (req, res, next) => {
    try {
        const { id, news } = req.body
        const manufacturer = await manufacturerRepository.updateNews(id, news)
        return res.status(200).json(manufacturer)
    } catch (err) {
        next(err)
    }
}

const deleteNews = async (req, res, next) => {
    try {
        const { id } = req.params
        const manufacturer = await manufacturerRepository.deleteNewsById(id)
        return res.status(200).json(manufacturer)
    } catch (err) {
        next(err)
    }
}


module.exports = {
    getAll,
    getById,
    postNews,
    putNews,
    deleteNews
}
