const mongoose = require('mongoose');
const ApiError = require('../api-error.js');
const util = require('../utils/index.js')
const model = require("../models/index.js")
const Employee = require("../models/employee.models.js")
const bcrypt = require('bcryptjs');

exports.getAllEmployee = async (req, res, next) => {
    try {
        const result = await model.EmployeeModel.find();
        res.status(200).json({
            message: "Get all Employee successfully",
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

exports.getEmployeeById = async (req, res, next) => {
    try {
        const id = req.params.id;
        if (!(mongoose.Types.ObjectId.isValid(id))) {
            throw new ApiError(400, "Employee id is not valid");
        }
        const result = await model.EmployeeModel.findById(id);
        if (!result)
            throw new ApiError(400, "Employee not exist");
        res.status(200).json({
            message: "Get Employee successfully",
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

exports.getEmployeeByEmail = async (email) => {
    const result = await model.EmployeeModel.findOne({ email });
    return result;
};

exports.createEmployee = async (req, res, next) => {
    try {
        const password = req.body.password;
        const data = req.body;
        const email = req.body.email;
        if (await model.ReaderModel.findOne({ email }) || await model.EmployeeModel.findOne({ email }))
            throw new ApiError(400, 'The account\'s email already exists.');
        data.password = data.password = await util.hashPasswordUtil.hashPassword({ password });
        const newEmployee = new Employee(data);
        await newEmployee.save();
        res.status(201).json({
            message: "Create successfully",
            data: newEmployee,
        });
    } catch (err) {
        next(err);
    }
};

exports.deleteEmployeeById = async (req, res, next) => {
    try {
        const id = req.params.id;
        if (!(mongoose.Types.ObjectId.isValid(id))) {
            throw new ApiError(400, "Employee id is not valid");
        }
        const result = await model.EmployeeModel.findByIdAndDelete(id);
        if (result)
            res.status(200).json({
                message: "Delete Employee successfully",
                data: result,
            });
        else
            res.status(400).json({
                message: "Employee id not exist",
                data: result,
            });
    } catch (err) {
        next(err);
    }
};

exports.updateEmployeeById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const employee = await Employee.findById(id);
        if (!employee)
            throw new ApiError(400, 'Employee id is not valid');
        const result = await model.EmployeeModel.findOneAndUpdate({ _id: id }, data);

        res.status(200).json({
            message: "Update Employee successfully",
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

exports.changeEmployeePassword = async (req, res, next) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const newPassword = req.body.newPassword;
        const employee = await Employee.findOne({ email });
        if (!employee)
            throw new ApiError(400, 'Wrong email or password');
        const isMatchPwd = await bcrypt.compare(password, employee.password);
        if (!isMatchPwd)
            throw new ApiError(400, 'Wrong email or password');
        employee.password = employee.password = await bcrypt.hash(newPassword, 10);
        await employee.save();
        res.status(200).json({
            message: "Change password successfully",
            data: employee,
        });
    } catch (err) {
        next(err);
    }
};