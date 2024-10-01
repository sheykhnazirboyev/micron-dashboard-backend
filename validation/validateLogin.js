const isEmpty = require("is-empty");
const Validator = require("validator")

module.exports = function(data){
    const errors = {};

     data.email = !isEmpty(data.email) ? data.email :"";
     data.password = !isEmpty(data.password) ? data.password :"";


    if(Validator.isEmpty(data.email)){
        errors.email = "Email field is required";
    } else if(!Validator.isEmail(data.email)){
        errors.email = "Email is invalid";
    }

    if(Validator.isEmpty(data.password)){
        errors.password = "Password field is required";
    }
    if(!Validator.isLength(data.password, {min:8, max: 30})){
        errors.password = "Password must be at least 8 charakters";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}