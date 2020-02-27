const express = require("express");
const mongoose = require("mongoose")
const hashingUtils = require("../utils/hashig")
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
        user.password = hashingUtils.hashFunc(user.password)
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

router.post("/login", async(req, res) => {
    try{
        const user = await User.findOne({email: req.body.email})
        if(hashingUtils.checkPassword(req.body.password, user.password)){
            res.cookie("user", user)
            res.json(user)
        } else{
            res.status(403).json({message: "The email or password was incorrect"})
        }
    } catch (e){
        res.json({message: e})
    }
})

router.delete("/:userId", async(req, res) => {
    try{
        const objectId = new mongoose.Types.ObjectId(req.params.userId)
        User.findByIdAndRemove({_id: objectId}, function(err){
            if (err) 
                res.json({message: err})
            res.json({message: "Deleted the user"})
        })
        
    } catch (e){
        res.json({message: e})
    }
})

module.exports = router;