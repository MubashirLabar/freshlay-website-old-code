const express = require("express");
const router = express.Router();
const { modifyposts,uploadsecondimg,getblogs,deleteblogs,getablog } = require("../controllers/blogs");
const protect = require('../middleware/protect')
//const { route } = require('./product');
const multer = require("multer");

const multstorage = multer.memoryStorage();
const multerfilter = (req, file, cb) => {
  // goal is to check , if the file is image
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    console.log("not image");
  }
};
const upload = multer({
  storage: multstorage,
  fileFilter: multerfilter,
});

// vendor and admin side

router.post("/updloadsecondimage",upload.single("file"),protect,uploadsecondimg)

router.post('/modifypost' ,protect ,upload.single("file")
//,upload.single("file2") 
,modifyposts)

router.get("/getblogs",getblogs)
router.get("/getablog/:id",getablog)
router.post("/deleteblog",protect,deleteblogs)

module.exports = router;
