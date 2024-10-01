const isEmpty = require("is-empty");
const Validator = require("validator");

module.exports = function(data){
    const errors = {};

    data.title = !isEmpty(data.title) ? data.title : "";

    if(Validator.isEmpty(data.title)){
        errors.title = "Title field is required";
    } else if(!Validator.isLength(data.title, {min: 3})){
        errors.title = "Title field must be at least 3 characters"
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}