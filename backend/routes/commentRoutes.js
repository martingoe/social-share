const express = require("express")
const mongoose = require("mongoose")
const User = require("../modules/user")

const Comment = require("../modules/comment")
const likesUtils = require("../utils/likesUtils")

const router = express.Router()

// Gets a specific comment by its id
router.get("/:postId", async (req, res) => {
    try {
        let comments = await Comment.findById(req.params.postId).populate("userId")
        const user = (await User.findOne({
            sid: req.cookies.sid
        }))

        let result = comments
        result.userLiked = comments.likesUser.includes(user)

        res.json(result)
    } catch (e) {
        res.json({
            message: e
        })
    }
})

// Post a new comment to the post with the user from the sid
router.post("/:postId", async (req, res) => {
    try {
        const comment = new Comment(req.body)
        comment.userId = (await User.findOne({
            sid: req.cookies.sid
        }))._id
        comment.postId = req.params.postId
        
        comment._id = new mongoose.Types.ObjectId()
        comment.save()

        res.json(comment)
    } catch (e) {
        res.json({
            message: e
        })
    }
})

// Like or unlike a comment
router.post("/like/:commentId", async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.commentId)
        const userId = (await User.findOne({
            sid: req.cookies.sid
        }))._id
        const result = await likesUtils.likeOrDislike(comment.likesUser, comment.likesCount, userId)
        comment.likesUser = result[0]
        comment.likesCount = result[1]
        await comment.save()
        res.json(likesUtils)
    } catch (e) {
        res.json({
            message: e
        })
    }
})


// Delete a comment by its id
router.delete("/:commentId", async(req, res) => {
    try{
        await Comment.deleteOne({_id: req.params.postId}, (err) => {
            if (err)
                res.json({message: err})
            res.json({message: "Deleted the comment"})
        })

    } catch(e) {
        res.json({message: e})
    }
})


module.exports = router