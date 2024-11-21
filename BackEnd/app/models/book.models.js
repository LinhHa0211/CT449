const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    availableCopies: {
        type: Number,
        required: true,
    },
    publicationDate: {
        type: Number,
        required: false,
    },
    publisherID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Publisher",
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: "No description yet",
    },
    image: {
        type: Buffer,
    },
    status: {
        type: String,
        enum: ['available', 'unavailable'],
        default: 'available',
    }
});

bookSchema.pre('save', function (next) {
    if (this.availableCopies === 0) {
        this.status = 'unavailable';
    } else {
        this.status = 'available';
    }
    next();
});

module.exports = mongoose.model('Book', bookSchema);