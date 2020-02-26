const express = require("express");
const mongoose = require("mongoose")
const User = require("../modules/user")

const router = express.Router();

// Get all users
router.get("/", async(req, res) => {
    try {
        const Users = await User.find();
        res.json(Users)
    } catch (e) {
        res.json({message: e})
    }
});

// Get the user from the userId
router.get("/:userId", async(req, res) => {
    try{
        const user = await User.findById(new mongoose.Types.ObjectId(req.params.userId))
        
        res.json(user)
    }
    catch (e){
        res.json({message: e})
    }
})

// Post a new user
// Returns the newly generated user
router.post("/", async(req, res) => {
    try{
        const user = new User(req.body)
        user._id = mongoose.Types.ObjectId()
        user.save((err, user) => {
            if (err) res.json({message: err})
            res.json(user)
        })
    }
    catch (e){
        res.json({message: e})
    }
})
module.exports = router;