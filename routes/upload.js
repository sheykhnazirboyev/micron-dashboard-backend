const express = require("express");
const router = express.Router();
const multer = require('multer');
const path = require('path');
const admin = require("../middleware/admin")
const auth = require("../middleware/auth")


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`)
  },
  fileFilter:function(req, file, cb){
      const ext = path.extname(file.originalname)
      if(ext !== ".jpg" || ext !== ".png")
          return cb(res.status(400).send("Only jpg and png allowed"), false)
      cb(null, true);
  }
})
 
var upload = multer({ storage: storage }).single("file");

router.post("/product", [auth, admin],  (req, res) => {
  
  upload(req, res, err => {
      if(err)   {
          console.log(err)
          return res.json({error: err });
      }
          
      return res.json({image: res.req.file.path, fileName: res.req.file.filename  })
  }) 
});


module.exports = router;