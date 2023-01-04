const express = require("express");

const router = express.Router();

const protect = require("../middleware/protect");

const {
  getdashboarddata,
  updatesettingswithlogo,
  updatesettings,
  getsettings,
  getmetatag
} = require("../controllers/admindatareviewsandsettings");
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

router.post(
  "/updatesettingslogo",
  upload.single("file"),
  updatesettingswithlogo
);
router.post("/updatesettings", protect, updatesettings);
router.get("/getsettings", protect, getsettings);
router.get("/getmetatags",getmetatag)
// dashboard
router.get("/getdashboarddata", protect, getdashboarddata);

module.exports = router;
