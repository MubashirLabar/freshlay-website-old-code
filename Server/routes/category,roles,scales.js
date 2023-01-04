const express = require("express");
const router = express.Router();
const {
  editscale,
  deletescale,
  addcategory,
  getallcategories,
  getacategory,
  editcategory,
  addscale,
  getscales,
  deletecategory,
} = require("../controllers/admincategoryandscales");
const multer = require("multer");
const {
  updateroleaccess,
  addnewrole,
  getroles,
  getarole,
  editrole,
  deleterole,
} = require("../controllers/adminroles");
const protect =  require('../middleware/protect')

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

// category routes
router.post("/addnewcategory", upload.single("file"),protect, addcategory);
router.post("/getcategories", getallcategories);
router.get("/getacategory/:id", getacategory);
router.post("/editcategory",protect, upload.single("file"), editcategory);
router.delete("/deletecategory/:id",protect, deletecategory);

// scales routes
//router.get('/getscales')
router.post("/addnewscale",protect, addscale);
router.post("/getscale", getscales);
router.post("/deletescale",protect, deletescale);
router.post("/editscale",protect, editscale);

// roles routes
router.post("/addnewrole",protect, addnewrole);
router.post("/modifyaccess",protect, updateroleaccess);
router.get("/getroles", getroles);
router.post("/getarole", getarole);
router.post("/editrole",protect, editrole);
router.post("/deleterole",protect, deleterole);

module.exports = router;
