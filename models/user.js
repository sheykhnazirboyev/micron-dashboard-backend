const mongoose = require("mongoose");
const Joi = require('@hapi/joi');
const jwt = require("jsonwebtoken");
const config = require("config");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30
    },
    email: {
        type: String, 
        required: true,
        minlength: 5,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role:{
        type: String,
        default: "user",
        enum:["user", "admin"]
    }
});

userSchema.methods.genToken = function(){
    return  jwt.sign({exp: Math.floor(Date.now() / 1000) + (60 * 60 * 12),  user: this }, process.env.JWT_PRIVATE_KEY);
}

const User = mongoose.model("User", userSchema);

function validateLoginForm(input){
    const schema = Joi.object({
        email: Joi.string().min(5).required().email(),
        password: Joi.string().required(),
    })

    return schema.validate(input)
}

exports.User= User;
exports.validateLoginForm = validateLoginForm;