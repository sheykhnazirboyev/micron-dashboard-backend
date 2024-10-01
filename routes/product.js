const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const { Category } = require("../models/category");
const validateProduct = require("../validation/product");
const validateId = require("../validation/validateId");
const { findById } = require("../models/product");
const { isEmpty } = require("lodash");
const admin = require("../middleware/admin")
const auth = require("../middleware/auth")

router.get("/", async (req, res) => {
    const products = await Product.find();

    res.status(200).json(products);
});

router.post("/", [auth, admin] , async (req, res) => {
    const { isValid, errors } = validateProduct(req.body);
    console.log(req.body)
    if (!isValid)
        return res.status(400).json({ errors });
    if (!validateId(req.body.categoryId))
        return res.status(400).json({ errors: { categoryId: "Category not found" } });

    const category = await Category.findById(req.body.categoryId);
    if (!category)
        return res.status(400).json({ errors: { categoryId: "Category not found" } });

    const product = new Product({
        category: category,
        name: req.body.name,
        images: req.body.images,
        main_image: req.body.main_image,
        avialability: req.body.avialability,
        features: req.body.features,
        sku: req.body.sku,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
    });

    await product.save();

    res.status(201).json(product);
});

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

router.post("/search", async (req, res) => {

    if (req.query.search) {
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        Product.find({ "name": regex }, function (err, products) {
            if (err) {
                console.log(err);
            } else {
                res.json(products);
            }
        });
    } else {
        Product.find(function (err, products) {
            if (err) {
                console.log(err);
            } else {
                res.json(products);
            }
        });
    }
});

router.get("/:id", async (req, res) => {

    if (!validateId(req.params.id))
        return res.status(404).json({ error: "Product not found" });

    const product = await Product.findById(req.params.id);
    if (!product)
        return res.status(404).json({ error: "Product not found" });

    res.status(200).json(product);
});

router.put("/:id", [auth,admin], async (req, res) => {
    const { isValid, errors } = validateProduct(req.body);
    if (!isValid)
        return res.status(400).json({ errors });

    if (!validateId(req.params.id))
        return res.status(404).json({ error: "Product not found" });

    if (!validateId(req.body.categoryId))
        return res.status(400).json({ errors: { categoryId: "Category not found" } });

    const category = await Category.findById(req.body.categoryId);
    if (!category)
        return res.status(400).json({ errors: { categoryId: "Category not found" } });

    const newProduct = await Product.findByIdAndUpdate(req.params.id, {
        category: category,
        name: req.body.name,
        images: req.body.images,
        main_image: req.body.main_image,
        avialability: req.body.avialability,
        features: req.body.features,
        sku: req.body.sku,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
    }, { new: true });

    if (!newProduct)
        return res.status(404).json({ error: "Product not found" });

    res.status(200).json(newProduct);
});

router.delete("/:id",[auth, admin], async (req, res) => {
    if (!validateId(req.params.id))
        return res.status(404).json({ error: "Product not found" });

    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product)
        return res.status(404).json({ error: "Product not found" });

    res.status(200).json(product);
});

module.exports = router;