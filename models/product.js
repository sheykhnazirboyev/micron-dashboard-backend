const mongoose = require("mongoose");
const {categorySchema}  = require("./category");

const productSchema = new mongoose.Schema({
    category:{
        type: categorySchema,
        required: true
    },
    name: {
        type: String,
        required: true,
        minlength: 3
    },
    images: {
        type: Array,
        required: true,
    },
    main_image: {
        type: String,
         required: true
    },
    reviews: {
        type: Number,
        default: 0
    },
    avialability    : {
        type: Number,
        default: 0
    },
    features: [String],
    sku: {
        type: String,
        required: true
    },
    new_price: {
        type: String,
        required: true
    },
    old_price: String,
});

productSchema.index({
    name: "text"
})


const Product = mongoose.model("Product", productSchema);

module.exports = Product;