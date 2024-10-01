const express = require("express");
const router = express.Router();
const { User } = require("../models/user");
const validateRegister  = require("../validation/validateRegister");
const validateLogin  = require("../validation/validateLogin");

const bcrypt = require("bcrypt");
const auth = require("../middleware/auth");
const _ = require("lodash");
const { isEmpty } = require("lodash");

router.post("/register", async (req, res) => {
    const {errors, isValid} = validateRegister(req.body);

    if(!isValid){
        return res.status(400).json(errors);
    }
        

    const email = await User.findOne({ email: req.body.email });
    
    if(email){
        console.log("email exists")
        return res.status(400).json({ email:  "Email is exist" });
    }
        

    const user = new User(_.pick(req.body, ["name", "email", "password", "role"]));

    const salt = await bcrypt.genSalt();
    
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    res.status(201).json({ success: true, user: _.pick(user, ["name", "email"])  });
});

router.post("/login", async (req, res) => {
    const {errors, isValid} = validateLogin(req.body);

    if(!isValid){
        return res.status(400).json(errors);
    }

    const user = await User.findOne({ email: req.body.email });

    if(!user)
        return res.status(400).json( { email: "User not found" });
    
    const isMatch = await bcrypt.compare(req.body.password, user.password);

    if(!isMatch)
        return res.status(400).send( {password: "Password is not match"});
    
    const token = user.genToken();

    res.status(200).json({success: true, token});
});

router.get("/me", auth ,  async (req, res) => {
    
    const user = await User.findById(req.user._id).select("-password");
    res.status(200).json({ success: true, user });
});

module.exports = router;
