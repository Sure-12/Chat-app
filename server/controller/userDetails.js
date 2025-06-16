const getUserDetailsFromToken = require("../helpers/getUserDetailsFromToken");

async function userDetails(request, response) {
    try {
        const token = request.cookies.token || "";
        const user = await getUserDetailsFromToken(token);

        if (!user || user.logout) {
            return response.status(200).json({
                data: null,
                logout: true,
                message: "Session expired"
            });
        }

        return response.status(200).json({
            data: user,
            logout: false
        });
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true
        });
    }
}

module.exports = userDetails;
