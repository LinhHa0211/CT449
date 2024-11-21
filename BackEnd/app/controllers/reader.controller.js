const mongoose = require('mongoose');
const ApiError = require('../api-error.js');
const util = require('../utils/index.js')
const model = require("../models/index.js")
const Reader = require("../models/reader.models.js")
const bcrypt = require('bcryptjs');

exports.getAllReader = async (req, res, next) => {
    try {
        const result = await model.ReaderModel.find();
        res.status(200).json({
            message: "Get all Reader successfully",
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

exports.getReaderById = async (req, res, next) => {
    try {
        const id = req.params.id;
        if (!(mongoose.Types.ObjectId.isValid(id))) {
            throw new ApiError(400, "Reader id is not valid");
        }
        const result = await model.ReaderModel.findById(id);
        if (!result)
            throw new ApiError(400, "Reader not exist");
        res.status(200).json({
            message: "Get Reader successfully",
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

exports.getReaderByEmail = async (email) => {
    const result = await model.ReaderModel.findOne({ email });
    return result;
};

exports.createReader = async (req, res, next) => {
    try {
        const password = req.body.password;
        const data = req.body;
        const email = req.body.email;
        if (await model.ReaderModel.findOne({ email }) || await model.EmployeeModel.findOne({ email }))
            throw new ApiError(400, 'The account\'s email already exists.');
        data.password = data.password = await util.hashPasswordUtil.hashPassword({ password });
        const newReader = new Reader(data);
        await newReader.save();
        res.status(201).json({
            message: "Create successfully",
            data: newReader,
        });
    } catch (err) {
        next(err);
    }
};

exports.deleteReaderById = async (req, res, next) => {
    try {
        const id = req.params.id;
        if (!(mongoose.Types.ObjectId.isValid(id))) {
            throw new ApiError(400, "Reader id is not valid");
        }
        const result = await model.ReaderModel.findByIdAndDelete(id);
        if (result)
            res.status(200).json({
                message: "Delete Reader successfully",
                data: result,
            });
        else
            res.status(400).json({
                message: "Reader id not exist",
                data: result,
            });
    } catch (err) {
        next(err);
    }
};

exports.updateReaderById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const reader = await Reader.findById(id);
        if (!reader)
            throw new ApiError(400, 'Reader id is not valid');
        const result = await model.ReaderModel.findOneAndUpdate({ _id: id }, data);

        res.status(200).json({
            message: "Update Reader successfully",
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

exports.changeReaderPassword = async (req, res, next) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const newPassword = req.body.newPassword;
        const reader = await Reader.findOne({ email });
        if (!reader)
            throw new ApiError(400, 'Wrong email or password');
        const isMatchPwd = await bcrypt.compare(password, reader.password);
        if (!isMatchPwd)
            throw new ApiError(400, 'Wrong email or password');
        reader.password = reader.password = await bcrypt.hash(newPassword, 10);
        await reader.save();
        res.status(200).json({
            message: "Change password successfully",
            data: reader,
        });
    } catch (err) {
        next(err);
    }
};