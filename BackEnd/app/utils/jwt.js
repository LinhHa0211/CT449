const jwt = require('jsonwebtoken');
require('dotenv').config({ path: 'config.env' });
const jwtSecret = "process.env.JWT_SECRET";

const maxAge = 3 * 60 * 60 //The token will be valid for 3 hours

const createToken = (data) => {
    return jwt.sign(data, jwtSecret, {
        expiresIn: maxAge, // Set the expiration time
    })
}

const createJWT = ({ response, data }) => {
    const token = createToken(data)
    response.cookie("jwt", token, { // Set the token as a cookie
        httpOnly: true, // Prevent access to cookie via JavaScript
        maxAge: maxAge * 1000, // Convert maxAge from seconds to milliseconds
    });
}

const resetJWT = ({ response }) => {
    response.cookie("jwt", "", {
        maxAge: 1, // Set an expiration time of 1 millisecond to remove the cookie
    });
}

module.exports = {
    createJWT,
    resetJWT,
}