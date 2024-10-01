const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    }
});

categorySchema.index({
    title: "text"
})



const Category = mongoose.model("Category", categorySchema);

exports.categorySchema = categorySchema;
exports.Category = Category;