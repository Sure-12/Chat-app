const UserModel = require("../models/UserModel");
const bcryptjs = require("bcryptjs");

async function registerUser(req, res) {
    try {
        const { name, email, password, profile_pic } = req.body;

        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new UserModel({
            name,
            email,
            profile_pic,
            password: hashedPassword
        });

        await newUser.save();

        return res.status(201).json({
            message: "User created successfully",
            success: true,
            data:newUser
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message || "Server error",
            error
        });
    }
}

module.exports = registerUser;
