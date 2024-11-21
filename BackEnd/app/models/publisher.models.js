const mongoose = require('mongoose');

const publisherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    address: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("Publisher", publisherSchema);