require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const UserController = require("./Controller/UserController");
const cookieSession = require("cookie-session");
const passport = require("passport");
const passportSetup = require("./passport");
const app = express();

//app.use(cors());
app.use(
    cookieSession({
        name: "session",
        keys: ["cyberwolve"],
        maxAge: 24 * 60 * 60 * 100,
    })
);

// middleware
const corsOptions = {
    origin: "http://localhost:3000", // frontend URI (ReactJS)
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
};
app.use(cors(corsOptions));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());

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

app.get("/api/v1/user/auth/login/success", (req, res) => {
    if (req.user) {
        res.status(200).json({
            error: false,
            message: "Successfully Logged In",
            user: req.user,
        });
    } else {
        res.status(403).json({ error: true, message: "Not Authorized" });
    }
});

app.get("/api/v1/user/login/failed", (req, res) => {
    res.status(401).json({
        error: true,
        message: "Log in failure",
    });
});

app.get(
    "/api/v1/user/auth/google/callback",
    passport.authenticate("google", {
        successRedirect: process.env.CLIENT_URL,
        failureRedirect: "/api/v1/user/login/failed",
    })
);

app.get("/api/v1/user/auth/google", passport.authenticate("google", ["profile", "email"]));

app.get("/api/v1/user/auth/logout", (req, res) => {
    req.logout();
    res.redirect(process.env.CLIENT_URL);
});

// routes
app.post("/api/v1/user/createManual", UserController.createUserManual);

app.post("/api/v1/user/create", UserController.createUser);

app.get("/api/v1/user/getAll", UserController.getAllUsers);

app.post("/api/v1/user/:id/addMovie", UserController.watchlistAdd);

app.delete("/api/v1/user/:id/deleteMovie", UserController.watchlistDelete);

// Default route
app.get("/", (req, res) => {
    res.status(201).json({ message: "Connected to Backend!" });
});
