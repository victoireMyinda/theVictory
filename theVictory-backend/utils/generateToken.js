import jwt from "jsonwebtoken";

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.VITE_APP_JWT_TOKEN, {
        expiresIn: "30d",
    });
};

module.exports = generateToken;