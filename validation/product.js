const isEmpty = require("is-empty");
const Validator = require("validator");

module.exports = function(data){
    const errors = {};

    data.categoryId = !isEmpty(data.categoryId) ? data.categoryId : "";
    data.name = !isEmpty(data.name) ? data.name : "";
    data.main_image = !isEmpty(data.main_image) ? data.main_image : "";
    data.sku = !isEmpty(data.sku) ? data.sku : "";
    

    if(Validator.isEmpty(data.name)){
        errors.name = "Name id field is required";
    }else if(!Validator.isLength(data.name, {min:3})){
        errors.name = "Name must be at least 3 charakters";
    }

    if(Validator.isEmpty(data.categoryId)){
        errors.categoryId = "Category id field is required";
    }
    if(Validator.isEmpty(data.main_image)){
        errors.main_image = "Main image id field is required";
    }

    if(isEmpty(data.images)  ||data.images && data.images.length == 0 ){
        errors.images = "Images field is required"
    }
    if(!isEmpty(data.avialability) && data.avialability < 0){
        errors.avialability = "Avialability field  must be at least 0"
    }
    if(!isEmpty(data.features)  &&  data.features.length == 0 ){
        errors.features = "Features field must contain at lest one feature"
    }

    if(Validator.isEmpty(data.sku)){
        errors.sku = "Sku field is required";
    }

    if(isEmpty(data.new_price)){
        errors.new_price = "New price field is required";
    } else if(parseInt(data.new_price)  < 0){
        errors.new_price = "New price field must be positive number";
    }

    if(!isEmpty(data.old_price) && parseInt(data.old_price) < 0){
        errors.old_price = "Old price field must be positive number";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
    
}