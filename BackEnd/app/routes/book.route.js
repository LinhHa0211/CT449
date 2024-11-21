const express = require('express');

const uploadImage = require('../utils/upload.js');
const controller = require('../controllers/index.js');
const middleware = require('../middleware/index.js')

const router = express.Router();

router.route('/')
    .get(controller.BookController.getAllBook)
    .post(uploadImage.singleUpload, controller.BookController.createBook)

router.route('/:id')
    .get(controller.BookController.getBookById)
    .put(controller.BookController.updateBookById)
    .delete(controller.BookController.deleteBookById)

router.route("/publisher/:id")
    .get(controller.BookController.getPublisher)


module.exports = router;