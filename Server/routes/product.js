const express = require("express");
const router = express.Router();
const {
  get50product,
  adminproductslist,
  searchproducts,
  filterproducts,
  getallproduct,
  createproduct,
  deleteaproduct,
  editproduct,
  getnextproductid,
  addcategory,
  getaproduct,
  updateproduct,
  getlandingproductfilter,
  pricelist,
  getonboardproducts,
  relatedproduct,
  popularproducts,
  appfilterandsearchproducts,
  uploadchoppedimages
} = require("../controllers/product");
const multer = require("multer");
const {
  responseproductrequest,
  createproductrequest,
  getproductrequest,
} = require("../controllers/adminproductrequests");
const protect = require("../middleware/protect");

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
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, 'public/choppedimages/');
  },
 
  filename: function(req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + '.jpg');
  }
});
 
var uploadimages = multer({ storage: storage })
// Client side router
router.get("/getproducts", getallproduct);
router.get("/getpopularproducts", popularproducts);
router.post("/getappfilterproducts",appfilterandsearchproducts)
router.get("/getaproduct/:id", getaproduct);
router.post("/searchproduct", searchproducts);
router.post("/landingproductfilter", getlandingproductfilter);
router.post("/filterproducts", filterproducts);
router.get("/get50randomproducts",get50product)
router.post("/getrelatedproducts",relatedproduct)

router.post('/pricelists',pricelist)

// Admin Routes
router.post("/uploadchoppedimages",uploadimages.array('multi'), uploadchoppedimages);
router.post("/createproduct",upload.single("file"),protect, createproduct);
router.get("/getnextproductid", protect,getnextproductid);
router.post("/getadminproductlist", protect,adminproductslist);
router.post("/editproduct", upload.single("file"), protect,editproduct);
router.patch("/updateproduct",protect,updateproduct);
router.delete("/deleteproduct/:id",protect, deleteaproduct);
router.get('/onboardproducts',getonboardproducts)

// admin product request
router.post("/productrequest", protect,createproductrequest);
router.post("/getproductrequests",protect, getproductrequest);
router.post("/responseproductrequest", protect,responseproductrequest);

module.exports = router;
