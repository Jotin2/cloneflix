const User = require("../Model/userModel"); // Import the User model

exports.createUser = async (req, res) => {
    try {
        // Create a new user instance based on the request body
        const newUser = new User({
            email: req.body.email,
            password: req.body.password,
        });

        // Save the new user to the database
        const savedUser = await newUser.save();

        res.status(201).json({
            status: "success",
            data: {
                user: savedUser,
            },
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: "error",
            message: "Failed to create user",
        });
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
