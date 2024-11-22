const mongoose = require('mongoose');

const borrowRequestSchema = new mongoose.Schema({
    readerID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reader',
        required: true,
    },
    bookID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true,
    },
    approvalDate: {
        type: Date,
        default: Date.now(),
    },
    dueDate: {
        type: Date,
        required: function () {
            return this.status === 'approved'; // Chỉ yêu cầu ngày trả khi sách đã được duyệt
        },
        default: function () {
            if (this.approvalDate) {
                // Tính toán ngày trả sách tự động (14 ngày sau approvalDate)
                return new Date(this.approvalDate).setDate(new Date(this.approvalDate).getDate() + 14);
            }
            return null;
        }
    },
    returnedDate: {
        type: Date,
        default: null,
    },
    employeeID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
    },
});

module.exports = mongoose.model('BorrowRequest', borrowRequestSchema);