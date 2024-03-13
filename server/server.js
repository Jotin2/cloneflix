require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const UserController = require("./Controller/UserController");
const app = express();

// middleware
/*const corsOptions = {
    origin: "https://cloneflix-frontend.onrender.com", // frontend URI (ReactJS)
};**/
app.use(express.json());
app.use(cors());

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

// routes
app.post("/api/v1/createUser", UserController.createUser);

app.get("/api/v1/user", UserController.getAllUsers);

app.post("/api/v1/user/:id/addMovie", UserController.watchlistAdd);

app.delete("/api/v1/user/:id/deleteMovie", UserController.watchlistDelete);

app.get("/", (req, res) => {
    res.status(201).json({ message: "Connected to Backend!" });
});
