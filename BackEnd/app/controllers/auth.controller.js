const ApiError = require('../api-error.js');
const util = require('../utils/index.js')
const model = require("../models/index.js");

const adminRole = process.env.ADMIN_ROLE
const userRole = process.env.USER_ROLE

exports.registerReader = async (req, res, next) => {
    try {
        const data = req.body;
        const email = data.email;
        if (await model.ReaderModel.findOne({ email }) || await model.EmployeeModel.findOne({ email }))
            throw new ApiError(400, 'The user\'s email already exists.');
        data.password = await util.hashPasswordUtil.hashPassword({ password: data.password })
        const user = await model.ReaderModel.create(data);
        util.jwtUtil.createJWT(
            {
                response: res,
                data: {
                    id: user.id,
                    email: user.email,
                    role: userRole,
                },
            }
        )
        res.status(200).json({
            message: "Register successfully",
            data: user,
        });
    } catch (err) {
        next(err);
    }
};

exports.registerEmployee = async (req, res, next) => {
    try {
        const data = req.body;
        const email = data.email;
        if (await model.ReaderModel.findOne({ email }) || await model.EmployeeModel.findOne({ email }))
            throw new ApiError(400, 'The user\'s email already exists.');
        data.password = await util.hashPasswordUtil.hashPassword({ password: data.password })
        const user = await model.EmployeeModel.create(data);
        util.jwtUtil.createJWT(
            {
                response: res,
                data: {
                    id: user.id,
                    email: user.email,
                    role: userRole,
                },
            }
        )
        res.status(200).json({
            message: "Register successfully",
            data: user,
        });
    } catch (err) {
        next(err);
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await model.ReaderModel.findOne({ email });
        const employee = await model.EmployeeModel.findOne({ email })
        if (!user && !employee)
            throw new ApiError(400, "Email or Password is wrong");
        const correctPassword = await util.hashPasswordUtil.comparePassword({
            password,
            hashPassword: user ? user.password : employee.password,
        })
        if (!correctPassword)
            throw new ApiError(400, "Email or Password is wrong");
        util.jwtUtil.createJWT(
            {
                response: res,
                data: {
                    id: user ? user.id : employee.id,
                    email: user ? user.email : employee.email,
                    role: user ? userRole : adminRole,
                },
            }
        )

        res.status(200).json({
            message: "Login successfully",
            data: user ? user : employee,
        });
    } catch (err) {
        next(err);
    }
};

exports.logout = async (req, res, next) => {
    try {
        util.jwtUtil.resetJWT({ response: res })
        res.status(200).json({
            message: "Logout successfully",
        });
    } catch (err) {
        next(err);
    }
};