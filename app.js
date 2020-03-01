require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/userRoutes");

const app = express();

const port = process.env.PORT;

app.use(bodyParser.json());
app.use(cookieParser())
app.use("/api/user", userRoutes);

// Catch 404 errors
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

mongoose.connect(process.env.MONGODB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log("Connected to " + process.env.MONGODB_CONNECTION)
});
app.listen(port, () => {
    console.log("Server is running")
});