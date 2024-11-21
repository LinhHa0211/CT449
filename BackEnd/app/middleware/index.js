const authMiddleware = require('./auth.js')
const handleErrorMiddleware = require('./handleError.js')
const multerMiddleware = require('./multer.js')

module.exports = {
    authMiddleware,
    handleErrorMiddleware,
    multerMiddleware,
}