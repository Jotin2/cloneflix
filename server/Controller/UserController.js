const User = require("../Model/userModel"); // Import the User model

exports.createUserManual = async (req, res) => {
    try {
        // Extract user data from the request body
        const { email, password } = req.body;

        // Check if the user already exists in your database
        const existingUser = await User.findOne({ email });

        // If the user already exists, send an error response
        if (existingUser) {
            return res.status(409).json({
                status: "error ",
                message: "User already exists",
            });
        }

        // Create a new user instance based on the extracted data
        const newUser = new User({ email, password });

        // Save the new user to the database
        const savedUser = await newUser.save();

        // Send success response
        res.status(201).json({
            status: "success",
            data: {
                user: savedUser,
            },
        });
    } catch (err) {
        console.error(err);
        // Send error response
        res.status(500).json({
            status: "error",
            message: "Failed to create users",
        });
    }
};

exports.createUser = async (profile, req, res) => {
    try {
        let userData;

        if (req) {
            // Extract user data from the request body
            const { email, password } = req.body;
            userData = { email, password };
        } else {
            // Extract user data from the profile object (for Google sign-ins)
            userData = { email: profile.email, password: "test" };
        }

        // Check if the user already exists in your database
        let user = await User.findOne({ email: userData.email });

        // If the user doesn't exist, create a new user
        if (!user) {
            // Create a new user instance based on the extracted data
            const newUser = new User(userData);

            // Save the new user to the database
            user = await newUser.save();

            // Send success response
            return {
                status: "success",
                data: {
                    user: user,
                },
            };
        } else {
            // Send user already exists response
            return {
                status: "error",
                message: "User already exists",
            };
        }
    } catch (err) {
        console.error(err);
        // Send error response
        return {
            status: "error",
            message: "Failed to create user",
        };
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();

        res.status(200).json({
            status: "success",
            data: {
                users: users,
            },
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: "error",
            message: "Failed to get all users",
        });
    }
};

exports.watchlistAdd = async (req, res) => {
    try {
        const userId = req.params.id;
        const tmdbId = req.body.tmdbId;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                status: "error",
                message: "User not found",
            });
        }

        user.tmdbid.push(tmdbId);
        const updatedUser = await user.save();

        res.status(200).json({
            status: "success",
            data: {
                user: updatedUser,
            },
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: "error",
            message: "Failed to update watchlist",
        });
    }
};

exports.watchlistDelete = async (req, res) => {
    try {
        const userId = req.params.id;
        const tmdbId = req.body.tmdbId;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                status: "error",
                message: "User not found",
            });
        }

        user.tmdbid.pull(tmdbId);
        const updatedUser = await user.save();

        res.status(200).json({
            status: "success",
            data: {
                user: updatedUser,
            },
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: "error",
            message: "Failed to update watchlist",
        });
    }
};
