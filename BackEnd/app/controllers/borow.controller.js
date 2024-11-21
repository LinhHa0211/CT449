const mongoose = require('mongoose');
const ApiError = require('../api-error.js');
const util = require('../utils/index.js')
const model = require("../models/index.js")
const Borow = require("../models/borow.models.js")

exports.getAllBorow = async (req, res, next) => {
    try {
        const result = await model.BorowModel.find();
        res.status(200).json({
            message: "Get all Borow successfully",
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

exports.getBorowById = async (req, res, next) => {
    try {
        const id = req.params.id;
        if (!(mongoose.Types.ObjectId.isValid(id))) {
            throw new ApiError(400, "Borow id is not valid");
        }
        const result = await model.BorowModel.findById(id);
        if (!result)
            throw new ApiError(400, "Borow not exist");
        res.status(200).json({
            message: "Get Borow successfully",
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

exports.getBorowByName = async (name) => {
    const result = await model.BorowModel.findOne({ name });
    return result;
};

exports.createBorow = async (req, res, next) => {
    try {
        const data = req.body;
        if (await this.getBorowByName(data.name))
            throw new ApiError(400, 'The Borow\'s name already exists.');
        const newBorow = new Borow(data);
        await newBorow.save();
        res.status(201).json({
            message: "Create Borow successfully",
            data: newBorow,
        });
    } catch (err) {
        next(err);
    }
};

exports.deleteBorowById = async (req, res, next) => {
    try {
        const id = req.params.id;
        if (!(mongoose.Types.ObjectId.isValid(id))) {
            throw new ApiError(400, "Borow id is not valid");
        }
        const result = await model.BorowModel.findByIdAndDelete(id);
        if (result)
            res.status(200).json({
                message: "Delete Borow successfully",
                data: result,
            });
        else
            res.status(400).json({
                message: "Borow id not exist",
                data: result,
            });
    } catch (err) {
        next(err);
    }
};

exports.updateBorowById = async (req, res, next) => {
    try {
        const id = req.params.id;
        if (!(mongoose.Types.ObjectId.isValid(id))) {
            throw new ApiError(400, "Borow id is not valid");
        }
        const data = req.body;
        const result = await model.BorowModel.findOneAndUpdate({ _id: id }, data);
        res.status(200).json({
            message: "Update publisher successfully",
            data: result,
        });
    } catch (err) {
        next(err);
    }
};