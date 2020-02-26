require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookies = require("cookies");
const userRoutes = require("./routes/userRoutes");

const app = express();

const port = process.env.PORT;

app.use(bodyParser.json());
app.use("/api/user", userRoutes);


mongoose.connect(process.env.MONGODB_CONNECTION,{useNewUrlParser: true, useUnifiedTopology: true}, () => {
    console.log("Connected to " + process.env.MONGODB_CONNECTION)
});
app.listen(port, () => {
    console.log("Server is running")
});