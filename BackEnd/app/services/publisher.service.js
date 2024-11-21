const { models } = require("mongoose");
const model = require("../models/index.js")
const Publisher = require("../models/publisher.models.js");

exports.createPublisher = async (data) => {
    try {
        const newPublisher = new Publisher(data);
        return await newPublisher.save();
    } catch (error) {
        throw new Error(`Create new publisher error: ${error.message}`);
    }
};

exports.getAllPublisher = async () => {
    try {
        return await model.PublisherModel.find();
    } catch (error) {
        throw new Error(`Get all publisher error: ${error.message}`);
    }
};

exports.getPublisherById = async (id) => {
    try {
        return await model.PublisherModel.findById(id);
    } catch (error) {
        throw new Error(`Get publisher by id error: ${error.message}`);
    }
};

exports.deletePublisher = async (id) => {
    try {
        return await model.PublisherModel.findByIdAndDelete(id);
    } catch (error) {
        throw new Error(`Delete publisher error: ${error.message}`);
    }
}

exports.updatePublisher = async ({ id, data }) => {
    try {
        const isExist = await this.getPublisherById(id);
        let result = null;
        if (isExist) {
            result = await model.PublisherModel.findByIdAndUpdate(id, data);
        }
        else {
            result = await this.create(data);
        }
        return result;
    } catch (error) {
        throw new Error(`Update publisher error: ${error.message}`);
    }
};