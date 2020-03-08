const express = require("express")
const mongoose = require("mongoose")
const User = require("../modules/user")

const Post = require("../modules/post")
const likesUtils = require("../utils/likesUtils")

const router = express.Router()


// Get the latest 20 posts
router.get("/", async (req, res) => {
    try {
        const user = await User.findOne({sid: req.cookies.sid})
        const posts = await Post.find({userId: {$in: user.followers}}).populate("userId").sort({creationDate: -1}).limit(20)

        let result = []
        for(let i=0; i < posts.length; i++){
            result.push(likesUtils.printPostLikes(posts[i], user._id))
        }
        res.json(result)
    } catch (e) {
        res.json({
            message: e
        })
    }
})

// Gets a specific post by its id
router.get("/:postId", async (req, res) => {
    try {
        let post = await Post.findById(req.params.postId).populate("userId")
        const userId = (await User.findOne({
            sid: req.cookies.sid
        }))._id

        post = likesUtils.printPostLikes(post, userId)

        res.json(post)
    } catch (e) {
        res.json({
            message: e
        })
    }
})

// Post a new post with the user from the sid
router.post("/", async (req, res) => {
    try {
        const post = new Post(req.body)
        post.userId = (await User.findOne({
            sid: req.cookies.sid
        }))._id
        post.likes = 0
        post.dislikes = 0
        post._id = new mongoose.Types.ObjectId()
        post.save()

        res.json(post)
    } catch (e) {
        res.json({
            message: e
        })
    }
})

// Like or unlike a post
router.post("/like/:postId", async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId)
        const userId = (await User.findOne({
            sid: req.cookies.sid
        }))._id
        const result = await likesUtils.likeOrDislike(post.likesUsers, post.likes, userId)
        post.likesUsers = result[0]
        post.likes = result[1]
        await post.save()
        res.json(likesUtils.printPostLikes(post, userId))
    } catch (e) {
        res.json({
            message: e
        })
    }
})

// Dislike or un-dislike a post
router.post("/dislike/:postId", async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId)
        const userId = (await User.findOne({
            sid: req.cookies.sid
        }))._id
        const result = await likesUtils.likeOrDislike(post.dislikesUsers, post.dislikes, userId)
        post.dislikesUsers = result[0]
        post.dislikes = result[1]
        await post.save()
        res.json(likesUtils.printPostLikes(post, userId))
    } catch (e) {
        res.json({
            message: e
        })
    }
})

// Delete a post by its id
router.delete("/:postId", async(req, res) => {
    try{
        await Post.deleteOne({_id: req.params.postId}, (err) => {
            if (err)
                res.json({message: err})
            res.json({message: "Deleted the user"})
        })

    } catch(e) {
        res.json({message: e})
    }
})


module.exports = router