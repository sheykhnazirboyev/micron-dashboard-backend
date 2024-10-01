const config = require("config");

module.exports = function(){
    if(process.env.JWT_PRIVATE_KEY){
        throw new Error("Jiddiy XAto: micron_jwtPrivateKey aniqlanmadi");
    };
}