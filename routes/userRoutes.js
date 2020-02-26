const express = require("express");
const User = require("../modules/user")

const router = express.Router();
router.get("/", async(req, res) => {
    try {
        const Users = await User.find();
        res.json(Users)
    } catch (e) {
        res.json({message: e})
    }
});

module.exports = router;