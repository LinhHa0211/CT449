const mongoose = require('mongoose');

const isObjectID = (id) => {
    return mongoose.Types.ObjectId.isValid(id)
}

module.exports = isObjectID