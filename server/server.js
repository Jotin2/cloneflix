require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const passport = require("passport");
const UserController = require("./Controller/UserController");
const passwordGenerator = require("password-generator");
const User = require("./Model/userModel");
const app = express();

// middleware
/*const corsOptions = {
    origin: "https://cloneflix-frontend.onrender.com", // frontend URI (ReactJS)
};**/
app.use(express.json());
app.use(cors());
app.use(passport.initialize());

// connect MongoDB
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        const PORT = process.env.PORT || 8000;
        app.listen(PORT, () => {
            console.log(`App is Listening on PORT ${PORT}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });

app.get("/api/v1/user/auth/google", passport.authenticate("google", { scope: ["email"] }));

// configure Google OAuth 2.0
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "/api/v1/user/auth/google/callback",
        },
        async function (accessToken, refreshToken, profile, done) {
            try {
                console.log("test");
                // Check if the user already exists in your database
                let user = await User.findOne({ email: profile.email });

                // If the user doesn't exist, create a new user
                if (!user) {
                    // Call createUser controller to create a new user
                    const randomPassword = passwordGenerator.generateRandomPassword();
                    user = await UserController.createUser({
                        email: profile.email,
                        password: randomPassword,
                    });
                }

                // Call done() with the user object
                done(null, user);
            } catch (err) {
                console.error(err);
                done(err, null);
            }
        }
    )
);

app.get(
    "/api/v1/user/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/login" }),
    function (req, res) {
        // Successful authentication, redirect to the homepage or another route
        res.redirect("/");
    }
);

// routes
app.post("/api/v1/user/create", UserController.createUser);

app.get("/api/v1/user/getAll", UserController.getAllUsers);

app.post("/api/v1/user/:id/addMovie", UserController.watchlistAdd);

app.delete("/api/v1/user/:id/deleteMovie", UserController.watchlistDelete);

// Default route
app.get("/", (req, res) => {
    res.status(201).json({ message: "Connected to Backend!" });
});
