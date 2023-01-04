const express = require("express");
const router = express.Router();
const { createreview,getproductreviews } = require("../controllers/review");
const {getreviews,updatereviewapproval} = require('../controllers/admindatareviewsandsettings')
const protect = require("../middleware/protect");
//const { route } = require('./product');

router.post("/createreview",protect, createreview);
router.get('/getproductreviews/:id',getproductreviews);

// Admin route
router.post("/getreviews",protect,getreviews)
router.post("/updatereviewapproval",protect,updatereviewapproval)


module.exports = router;
