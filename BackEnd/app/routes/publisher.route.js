const express = require('express');
const controller = require('../controllers/index.js');
const middleware = require('../middleware/index.js')

const router = express.Router();

router.route('/')
    .get(controller.PublisherController.getAllPublisher)
    .post(controller.PublisherController.createPublisher)

router.route('/:id')
    .get(controller.PublisherController.getPublisherById)
    .put(controller.PublisherController.updatePublisherById)
    .delete(controller.PublisherController.deletePublisherById)

module.exports = router;