const mongoose = require("mongoose")
const User = require("./user")

const schema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    content: String,
    userId: {type: mongoose.Types.ObjectId, ref: "user"},
    creationDate: {type: Date, default: Date.now},
    likes: Number,
    dislikes: Number,
    likesUsers: [mongoose.Types.ObjectId],
    dislikesUsers: [mongoose.Types.ObjectId]
})

module.exports = mongoose.model("post", schema)