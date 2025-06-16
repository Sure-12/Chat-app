// helpers/getUserDetailsFromToken.js
const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel');

const getUserDetailsFromToken = async (token) => {
    try {
        if (!token) {
            console.log("No token provided");
            return null;
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
        // console.log("Decoded token:", decode); // Optional: for debugging

        const user = await UserModel.findById(decode.id).select('-password');
        if (!user) {
            console.log("User not found from decoded ID");
        }

        return user;
    } catch (error) {
        console.error("Token verification failed:", error.message);
        return null;
    }
};

module.exports = getUserDetailsFromToken;
