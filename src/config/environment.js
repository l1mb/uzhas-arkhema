const dotenv = require('dotenv')

const env = dotenv.config()
if (env.error) {
    console.error('specify parameters in .env file')
    process.exit(1)
}

const config = {}

config.threadpoolSize = parseInt(process.env.UV_THREADPOOL_SIZE)
config.dbConfig = {
    user: env.parsed.DB_USERNAME,
    password: env.parsed.DB_PASSWORD,
    connectionString: env.parsed.DB_URL,
    poolIncrement: config.threadpoolSize ? 0 : 1,
    poolMin: config.threadpoolSize || 0,
    poolMax: config.threadpoolSize || 4,
}
config.cloudinaryConfig = {
    cloud_name: env.parsed.CLOUDINARY_CLOUD,
    api_key: env.parsed.CLOUDINARY_KEY,
    api_secret: env.parsed.CLOUDINARY_SECRET,
    secure: true,
}
config.placeholderImgUrl =
    'http://res.cloudinary.com/dbu4voh2q/image/upload/v1639929352/napea3wmdmelbb8osr0m.jpg'
config.port = process.env.PORT || 5000
config.jwtSecret = env.parsed.TOKEN_SECRET

module.exports = config
