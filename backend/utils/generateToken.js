const jwt = require("jsonwebtoken");

// @desc    Generate JWT token valid for 30 days
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30m",
    });
};

module.exports = generateToken;