const express = require("express");
const mongoose = require("mongoose")
const hashingUtils = require("../utils/hashig")
const User = require("../modules/user")
const Post = require("../modules/post")
const sidUtils = require("../utils/idCreator")
const likesUtils = require("../utils/likesUtils")

const router = express.Router();

// Get all users
router.get("/", async (req, res) => {
    try {
        const Users = await User.find();
        res.json(Users)
    } catch (e) {
        res.json({
            message: e
        })
    }
});

// Get the user from the userId
router.get("/:userId", async (req, res) => {
    try {
        const user = await User.findById(new mongoose.Types.ObjectId(req.params.userId))

        res.json(user)
    } catch (e) {
        res.json({
            message: e
        })
    }
})

// Get the latest 20 posts from a specific user
router.get("/:userId/posts", async (req, res) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.params.userId)
        const posts = await Post.find({
            userId: userId
        }).sort({creationDate: -1}).limit(20)
        for (let i = 0; i < posts.length; i++) {
            posts[i] = likesUtils.printPostLikes(posts[i], userId)
        }
        res.json(posts)
    } catch (e) {
        res.json({
            message: e
        })
    }
})

// Post a new user
// Returns the newly generated user
router.post("/", async (req, res) => {
    try {
        const user = new User(req.body)
        user.password = hashingUtils.hashFunc(user.password)
        user._id = mongoose.Types.ObjectId()
        user.sid = sidUtils.uniqueSid()
        user.save((err, user) => {
            if (err) res.json({
                message: err
            })
            res.cookie("sid", user.sid, {
                expires: new Date(2147483647000)
            })
            res.json(user)
        })
    } catch (e) {
        res.json({
            message: e
        })
    }
})

// logs the user in by returning the user and adding a session id
router.post("/login", async (req, res) => {
    try {
        if (req.cookies.sid) {
            const user = await User.findOne({
                sid: req.cookies.sid
            })
            res.json(user)
        } else {
            const user = await User.findOne({
                email: req.body.email
            })
            if (hashingUtils.checkPassword(req.body.password, user.password)) {
                const sid = sidUtils.uniqueSid()
                sidUtils.saveSidToUser(user, sid)

                res.cookie("sid", sid, {
                    expires: new Date(2147483647000)
                })
                res.json(user)
            } else {
                res.status(403).json({
                    message: "The email or password was incorrect"
                })
            }
        }
    } catch (e) {
        res.json({
            message: e
        })
    }
})

// Log the user out by removing the sid cookie
router.post("/logout", async (req, res) => {
    try {
        res.clearCookie("sid")
        res.json({
            message: "Successfully logged out"
        })
    } catch (e) {
        res.json({
            message: e
        })
    }
})

// Follow or unfollow a specific user
router.post("/follow/:userId", async (req, res) => {
    try {
        let user = await User.findOne({sid: req.cookies.sid})
        let userToFollow = await User.findById(req.params.userId)

        const result = await likesUtils.followOrUnfollow(user, userToFollow)
        user = result[0]
        userToFollow = result[1]
        user.save()
        userToFollow.save()

        res.json(userToFollow)
    } catch (e) {

    }
})

// Deletes the user by the user id
router.delete("/:userId", async (req, res) => {
    try {
        const objectId = new mongoose.Types.ObjectId(req.params.userId)
        User.deleteOne({
            _id: objectId
        }, (err) => {
            if (err)
                res.json({
                    message: err
                })
            res.json({
                message: "Deleted the user"
            })
        })

    } catch (e) {
        res.json({
            message: e
        })
    }
})

module.exports = router;