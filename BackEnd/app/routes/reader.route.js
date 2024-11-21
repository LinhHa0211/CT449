const express = require('express');
const controller = require('../controllers/index.js');
const middleware = require('../middleware/index.js')

const router = express.Router();

router.route('/')
    .get(controller.ReaderController.getAllReader)
    .post(controller.ReaderController.createReader)

router.route('/password').post(controller.ReaderController.changeReaderPassword )

router.route('/:id')
    .get(controller.ReaderController.getReaderById)
    .put(controller.ReaderController.updateReaderById)
    .delete(controller.ReaderController.deleteReaderById)

module.exports = router;