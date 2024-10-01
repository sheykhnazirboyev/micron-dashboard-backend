module.exports = function(req, res, next){
    if(req.user && req.user.user && req.user.user.role !== "admin"){
        return res.status(403).json({message:"Forbidden"})
    } else {
        next();
    }
}