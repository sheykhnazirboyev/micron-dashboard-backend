const isEmpty = require("is-empty");
const Validator = require("validator")
module.exports = function(data){
    const errors = {};

     data.name = !isEmpty(data.name) ? data.name :"";
     data.email = !isEmpty(data.email) ? data.email :"";
     data.password = !isEmpty(data.password) ? data.password :"";
     data.confirm_password = !isEmpty(data.confirm_password) ? data.confirm_password :"";

    if(Validator.isEmpty(data.name)){
        errors.name = "Name field is required";
    } else if(!Validator.isLength(data.name, {min:3, max: 30})){
        errors.name = "Name must be at least 3 charakters";
    }
    

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

    if(!Validator.equals(data.password, data.confirm_password)){
        errors.confirm_password = "Passwords must match";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}