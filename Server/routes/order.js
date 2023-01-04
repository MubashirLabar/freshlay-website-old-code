const express = require("express");
const {
  responseproductrequest,
} = require("../controllers/adminproductrequests");

const router = express.Router();
const {
  getanorder,
  allorders,
  createOrder,
  getuserorder,
  getvenderorders,
  responseorderrequest,
  getvendorrider,
  getriderorders,
  getriderinfo,
  updateriderlocation,
  getactiveorder,
  updateriderdelivery,
  getcheckoutsession,
  deleteorder,
  editorder,
  editdeliverytype,
  getslotreport,
  checkcoupencode
} = require("../controllers/order");
const protect = require("../middleware/protect");
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

// user
router.get('/getuseractiveorder',protect,getactiveorder)
router.post("/createorder", upload.single("file"),
//protect,
createOrder);
router.post("/getorders", protect, getuserorder);
router.post("/getcheckoutsession",protect,getcheckoutsession)
// Admin and Vender
router.post("/responseorder",protect, responseorderrequest);
router.post("/getvendersorder",protect, getvenderorders);
router.post("/allorders",protect, allorders);
router.get("/getanorder/:id",protect, getanorder);
router.get("/getvendorriders/:id",protect, getvendorrider);
router.post("/getslotreport",protect, getslotreport);
router.post("/checkcoupincode", checkcoupencode);
// Admin
router.get("/deleteanorder/:id",protect,deleteorder)
router.post("/editanorder/:id",protect,editorder)
//router.post("/editorderdeliverytype/:id",protect,editdeliverytype)
// rider
router.get('/getriderorders',protect,getriderorders)
router.get('/getriderinfo',protect,getriderinfo)
router.post('/updateriderlocation',protect,updateriderlocation)
router.post('/updatedelivery',protect,updateriderdelivery)
module.exports = router;
