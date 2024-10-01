const express = require("express");
const cors = require("cors");

module.exports = function(app){
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use("/api/users", require("../routes/user"));
    app.use("/api/categories", require("../routes/category"));
    app.use("/api/products", require("../routes/product"));
    app.use("/api/uploads", require("../routes/upload"));
    app.use('/uploads', express.static('uploads'));
}