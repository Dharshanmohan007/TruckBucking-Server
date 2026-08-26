const jwt = require("jsonwebtoken");

const generateToken = (user) => {
    const payload = {
        userId: user.user_id,
        email: user.email,
        role: user.role
    };

    const token = jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN || "1d"
        }
    );

    return token;
};

const verifyToken = (token) => {
    return jwt.verify(
        token,
        process.env.JWT_SECRET
    );
};

module.exports = {
    generateToken,
    verifyToken
};