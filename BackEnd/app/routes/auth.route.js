const express = require('express');
const controller = require('../controllers/index.js');

const router = express.Router();

router.route('/registerAdmin').post(controller.AuthController.registerEmployee);
router.route('/register').post(controller.AuthController.registerReader);
router.route('/login').post(controller.AuthController.login);
router.route('/logout').post(controller.AuthController.logout);

module.exports = router;