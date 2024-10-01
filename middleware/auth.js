const jwt = require("jsonwebtoken");
const jwt_decode = require("jwt-decode");
const isEmpty = require("is-empty");
const config = require("config")

const JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY;

module.exports = function(req, res, next){

    const token = req.header("x-auth-token");


    if(!token)
        return res.status(401).send({ success: false, error: "Invalid token1" });
    

    try {
        const decoded =  jwt.verify(token, JWT_PRIVATE_KEY);
        next();
    } catch {
        res.status(401).json({ success: false, error: "Invalid token" });
    }
}