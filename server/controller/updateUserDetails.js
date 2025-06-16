const getUserDetailsFromToken = require("../helpers/getUserDetailsFromToken");
const UserModel = require("../models/UserModel");

async function updateUserDetails(request, response) {
    try {
        const token = request.cookies.token || "";

        const user = await getUserDetailsFromToken(token);

        // 🔒 Check if token is invalid or expired
        if (!user || !user._id) {
            return response.status(401).json({
                message: "Invalid or expired token",
                error: true
            });
        }

        const { name, profile_pic } = request.body;

        await UserModel.updateOne(
            { _id: user._id },
            { name, profile_pic }
        );

        const userInformation = await UserModel.findById(user._id);

        return response.json({
            message: "User updated",
            data: userInformation,
            success: true
        });
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true
        });
    }
}

module.exports = updateUserDetails;
