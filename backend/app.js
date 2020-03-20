require("dotenv").config({path: __dirname + '/.env'});

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/userRoutes");
const commentRoutes = require("./routes/commentRoutes");
const postRoutes = require("./routes/postRoutes")

const app = express();

const port = process.env.PORT;


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', req.get("origin") ? req.get("origin") : "https://localhost:2020");

// Request methods you wish to allow
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

// Request headers you wish to allow
res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

// Set to true if you need the website to include cookies in the requests sent
// to the API (e.g. in case you use sessions)
res.setHeader('Access-Control-Allow-Credentials', true);

next()
});

app.use(bodyParser.json())
app.use(cookieParser())
app.use("/api/user", userRoutes)
app.use("/api/comment", commentRoutes)
app.use("/api/post", postRoutes)




// Catch 404 errors
app.use(function (req, res, next) {
    res.status(404).json({message: "This page does not exist"})
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