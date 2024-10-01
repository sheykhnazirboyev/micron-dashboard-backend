const express = require("express");
const router = express.Router();
const {Category}  = require("../models/category");
const validateCategory = require("../validation/category");
const validateId  = require("../validation/validateId");
const { isEmpty } = require("is-empty");
const auth  = require("../middleware/auth");
const admin = require("../middleware/admin");

router.post("/", [auth, admin] , async (req, res) => {
    const {errors, isValid} = validateCategory(req.body);
    
    if(!isValid)
        return res.status(400).json(errors);
    
    const category = new Category({
        title: req.body.title
    });

    await category.save();

    res.status(201).json(category);
});

router.get("/", async (req, res) => {
    const categories = await Category.find();

    res.status(200).json(categories);
});

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

router.post("/search",  (req, res) => {
    
    if (req.query.search) {
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        Category.find({ "title": regex }, function(err, categories) {
            if(err) {
                console.log(err);
            } else {
               res.json(categories);
            }
        }); 
     } else {
         console.log("empty")
        Category.find(function(err, categories) {
            if(err) {
                console.log(err);
            } else {
               res.json(categories);
            }
        })
     }
});

router.get("/:id", async (req, res) => {
    if(!validateId(req.params.id))
        return res.status(404).json({ error: "Category not found" });

    const category = await Category.findById(req.params.id);

    if(!category)
        return res.status(404).send({error: "Category not found"});
    
    res.status(200).json(category);
})

router.put("/:id", [auth, admin], async (req, res) => {
    if(!validateId(req.params.id))
        return res.status(404).json({ error: "Category notfound" });

    const category = await Category.findByIdAndUpdate(req.params.id, {
        title: req.body.title
    }, {new: true});
    if(!category){
        return res.status(404).send({error: "Category not found"});
    }
    res.json(category);
});

router.delete("/:id",[auth, admin], async (req, res) => {
    if(!validateId(req.params.id))
        return res.status(404).json({ error: "Category not found" });

    const category = await Category.findByIdAndDelete(req.params.id);

    if(!category)
        return res.status(404).json({error: "Category not found"});

    res.json(category);
});

module.exports = router;