const express = require("express");
const router = express.Router();
const { addnewpackage ,getpackage,deletepackage,getnextpackageid,getallpackages
,adminsearchandgetpackages,getvendorpackages
} = require("../controllers/packages");
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
router.post("/createpackage",  upload.single("file"),protect,addnewpackage);
router.get('/getnextpackageid',getnextpackageid);
// name should be managepackage
router.delete("/getapackage/:id",protect,deletepackage);
router.post('/adminsearchandgetpackages',adminsearchandgetpackages)
router.get('/getvendorpackages',protect,getvendorpackages)

// client routes
router.get('/allpackages',getallpackages)
router.get("/getapackage/:id",getpackage)

module.exports = router;
