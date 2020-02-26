const mongoose = require("mongoose");

const schema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    username: String,
    email: String,
    password: String,
    phone: String,
    name: {
        forename: String,
        surname: String
    }

});

module.exports = mongoose.model("user", schema);