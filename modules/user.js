const mongoose = require("mongoose");
const transforms = require("../utils/transform")

const schema = mongoose.Schema({
    _id: {
        type: mongoose.Types.ObjectId
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: String,
    sid: String,
    name: {
        forename: String,
        surname: String
    },
    followers: {type: [mongoose.Types.ObjectId], ref: "user"},
    followercount: {type: Number, default: 0}
});

schema.set("toJSON", {transform: transforms.userDefaultPrint})
module.exports = mongoose.model("user", schema);