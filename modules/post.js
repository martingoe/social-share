const mongoose = require("mongoose")
const User = require("./user")

const schema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    content: String,
    userId: {type: mongoose.Types.ObjectId, ref: "user"},
    creationDate: Date,
    likes: Number,
    dislikes: Number,
    likesUsers: [mongoose.Types.ObjectId],
    dislikesUsers: [mongoose.Types.ObjectId],
    userLiked: Boolean,
    userDisliked: Boolean
})

module.exports = mongoose.model("post", schema)