const multer = require('multer');
const path = require('path');
const fs = require('fs');

if (!fs.existsSync('uploads/')) {
    fs.mkdirSync('uploads/');
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Thư mục nơi lưu trữ các file tải lên
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Đặt tên file để tránh bị trùng
    }
});

const fileFilter = (req, file, cb) => {
    console.log('MIME type:', file.mimetype);
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Just allow JPEG, JPG, PNG, GIF');
    }
};

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Giới hạn kích thước file là 5MB
    fileFilter: fileFilter
});

module.exports = upload;