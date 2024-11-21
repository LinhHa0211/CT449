const express = require('express');
const controller = require('../controllers/index.js');
const middleware = require('../middleware/index.js')

const router = express.Router();

router.route('/')
    .get(controller.BorowController.getAllBorow)
    .post(controller.BorowController.createBorow)

router.route('/:id')
    .get(controller.BorowController.getBorowById)
    .put(controller.BorowController.updateBorowById)
    .delete(controller.BorowController.deleteBorowById)

module.exports = router;