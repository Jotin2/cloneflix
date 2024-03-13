require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

const app = express();

// middleware
const corsOptions = {
    origin: "http://localhost:3000", // frontend URI (ReactJS)
};
app.use(express.json());
app.use(cors(corsOptions));

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

// route
app.get("/", (req, res) => {
    res.status(201).json({ message: "Connected to Backend!" });
});
