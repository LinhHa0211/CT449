const mongoose = require('mongoose');
const ApiError = require('../api-error.js');
const util = require('../utils/index.js')
const model = require("../models/index.js")
const Publisher = require("../models/publisher.models.js")

exports.getAllPublisher = async (req, res, next) => {
    try {
        const result = await model.PublisherModel.find();
        res.status(200).json({
            message: "Get all publisher successfully",
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

exports.getPublisherById = async (req, res, next) => {
    try {
        const id = req.params.id;
        if (!(mongoose.Types.ObjectId.isValid(id))) {
            throw new ApiError(400, "Publisher id is not valid");
        }
        const result = await model.PublisherModel.findById(id);
        if (!result)
            throw new ApiError(400, "Publisher not exist");
        res.status(200).json({
            message: "Get publisher successfully",
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

exports.getPublisherByName = async (name) => {
    const result = await model.PublisherModel.findOne({ name });
    return result;
};

exports.createPublisher = async (req, res, next) => {
    try {
        const data = req.body;
        if (await this.getPublisherByName(data.name))
            throw new ApiError(400, 'The publisher\'s name already exists.');
        const newPublisher = new Publisher(data);
        await newPublisher.save();
        res.status(201).json({
            message: "Create publisher successfully",
            data: newPublisher,
        });
    } catch (err) {
        next(err);
    }
};

exports.deletePublisherById = async (req, res, next) => {
    try {
        const id = req.params.id;
        if (!(mongoose.Types.ObjectId.isValid(id))) {
            throw new ApiError(400, "Publisher id is not valid");
        }
        const result = await model.PublisherModel.findByIdAndDelete(id);
        if (result)
            res.status(200).json({
                message: "Delete publisher successfully",
                data: result,
            });
        else
            res.status(400).json({
                message: "Publisher id not exist",
                data: result,
            });
    } catch (err) {
        next(err);
    }
};

exports.updatePublisherById = async (req, res, next) => {
    try {
        const id = req.params.id;
        if (!(mongoose.Types.ObjectId.isValid(id))) {
            throw new ApiError(400, "Publisher id is not valid");
        }
        const data = req.body;
        console.log(data);
        const result = await model.PublisherModel.findOneAndUpdate({ _id: id }, data);
        res.status(200).json({
            message: "Update publisher successfully",
            data: result,
        });
    } catch (err) {
        next(err);
    }
};