const express = require('express');
const cors = require('cors');
const ApiError = require('./app/api-error.js');
const middleware = require('./app/middleware/index.js')
const router = require('./app/routes/index.js');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', router.AuthRouter);
app.use('/api/reader', router.ReaderRouter);
app.use('/api/employee', router.EmployeeRouter);
app.use('/api/book', router.BookRouter);
app.use('/api/borow', router.BorowRouter)
app.use('/api/publisher', router.PublisherRouter)

app.use((req, res, next) => {
    return next(new ApiError(404, "Resource not found"));
});
app.use((err, req, res, next) => {
    const { statusCode, message } = middleware.handleErrorMiddleware(err);
    return res.status(statusCode).json({
        message
    });
});

app.post('/test', (req, res) => {

})

module.exports = app;