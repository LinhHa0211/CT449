const express = require('express');
const controller = require('../controllers/index.js');
const middleware = require('../middleware/index.js')

const router = express.Router();

router.route('/')
    .get(controller.EmployeeController.getAllEmployee)
    .post(controller.EmployeeController.createEmployee)

router.route('/password').post(controller.EmployeeController.changeEmployeePassword)

router.route('/:id')
    .get(controller.EmployeeController.getEmployeeById)
    .put(controller.EmployeeController.updateEmployeeById)
    .delete(controller.EmployeeController.deleteEmployeeById)

module.exports = router;