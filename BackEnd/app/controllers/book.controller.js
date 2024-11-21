const mongoose = require('mongoose');
const ApiError = require('../api-error.js');
const util = require('../utils/index.js')
const model = require("../models/index.js")
const Book = require("../models/book.models.js")
const bcrypt = require('bcryptjs');
const path = require('path');
const upload = require('../middleware/multer.js')

exports.getAllBook = async (req, res, next) => {
    try {
        const result = await model.BookModel.find();
        const booksWithBase64Images = result.map((book) => {
            const bookObj = book.toObject();
            if (book.image) {
                bookObj.image = `data:image/jpeg;base64,${book.image.toString('base64')}`;
            }
            return bookObj;
        });
        res.status(200).json({
            message: "Get all Book successfully",
            data: booksWithBase64Images,
        });
    } catch (err) {
        next(err);
    }
};

exports.getBookById = async (req, res, next) => {
    try {
        const id = req.params.id;
        if (!(mongoose.Types.ObjectId.isValid(id))) {
            throw new ApiError(400, "Book id is not valid");
        }
        const result = await model.BookModel.findById(id);

        if (!result)
            throw new ApiError(400, "Book not exist");
        if (result.image) {
            result.image = `data:image/jpeg;base64,${result.image.toString('base64')}`;
        }
        res.status(200).json({
            message: "Get Book successfully",
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

exports.getPublisher = async (req, res, next) => {
    try {
        const id = req.params.id;
        const book = await model.BookModel.findById(id);
        const result = await model.PublisherModel.findById(book.publisherID)
        res.status(200).json({
            message: "Get publisher successfully",
            data: result,
        })
    } catch (err) {
        next(err)
    }
}

exports.createBook = async (req, res, next) => {
    const { title, availableCopies, publicationDate, publisherID, author, description } = req.body;
    let image = null
    if (req.file) {
        image = req.file.buffer;
    }
    try {
        const newBook = new Book({
            title,
            availableCopies,
            publicationDate,
            publisherID,
            author,
            description,
            image,
            status: 'available',
        });
        await newBook.save();
        res.status(201).json({
            message: "Create successfully",
            data: newBook,
        });
    } catch (err) {
        next(err);
    }
};

exports.deleteBookById = async (req, res, next) => {
    try {
        const id = req.params.id;
        if (!(mongoose.Types.ObjectId.isValid(id))) {
            throw new ApiError(400, "Book id is not valid");
        }
        const result = await model.BookModel.findByIdAndDelete(id);
        if (result)
            res.status(200).json({
                message: "Delete Book successfully",
                data: result,
            });
        else
            res.status(400).json({
                message: "Book id not exist",
                data: result,
            });
    } catch (err) {
        next(err);
    }
};

exports.updateBookById = async (req, res, next) => {
    let image = null
    if (req.file) {
        image = req.file.buffer;
    }
    try {
        const id = req.params.id;
        const data = req.body;
        data.image = image;
        const book = await Book.findById(id);
        if (!book)
            throw new ApiError(400, 'Book id is not valid');
        const result = await model.BookModel.findOneAndUpdate({ _id: id }, data);

        res.status(200).json({
            message: "Update Book successfully",
            data: result,
        });
    } catch (err) {
        next(err);
    }
};
