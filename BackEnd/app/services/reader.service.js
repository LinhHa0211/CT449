const { models } = require("mongoose");
const model = require("../models/index.js")
const Reader = require("../models/reader.models.js");

exports.createReader = async (data) => {
    try {
        const newReader = new Reader(data);
        return await newPublisher.save();
    } catch (error) {
        throw new Error(`Create new reader error: ${error.message}`);
    }
};

exports.getAllReader = async () => {
    try {
        return await model.ReaderModel.find();
    } catch (error) {
        throw new Error(`Get all Reader error: ${error.message}`);
    }
};

exports.getReaderById = async (id) => {
    try {
        return await model.ReaderModel.findById(id);
    } catch (error) {
        throw new Error(`Get Reader by id error: ${error.message}`);
    }
};

exports.deleteReader = async (id) => {
    try {
        return await model.ReaderModel.findByIdAndDelete(id);
    } catch (error) {
        throw new Error(`Delete Reader error: ${error.message}`);
    }
}

exports.updateReader = async ({ id, data }) => {
    try {
        const isExist = await this.getReaderById(id);
        let result = null;
        if (isExist) {
            result = await model.ReaderModel.findByIdAndUpdate(id, data);
        }
        else {
            result = await this.create(data);
        }
        return result;
    } catch (error) {
        throw new Error(`Update Reader error: ${error.message}`);
    }
};