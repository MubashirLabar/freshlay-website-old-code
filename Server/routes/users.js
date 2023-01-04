const express = require("express");
const router = express.Router();
const {
  updateaddressbook,
  saveUserPhoto,
  updatepassword,
  googleControllersignin,
  getuser,
  facebookControllersignin,
  facebookControllersignup,
  googleControllersignup,
  updateuser,
  createuser,
  loginuser,
  resetpasswithmessage,
  changepassword,
  confirmresetlink,
  forgotPasswordwithemail,
  addtowishlist,
  getwishlist,
  verifyemail,
  sendlinkagain,
  confirmcode,
  addnotification,
  removenotification,
  sendCodeForVerifyEmail,
  saveaddressnonlogined,
  sendhelpemail,
  getuserwithnumber,
  checkrefer
} = require("../controllers/users");
const {
  getusers,
  createusers,
  getauser,
  edituser,
  edituseraccess,
  getvendorriders,
  getusersdetails
} = require("../controllers/adminuserhandler");
const protect = require("../middleware/protect");
const {
  validLogin,
  validSignup,
  resetpassvalidmessage,
  forgetemailpassvalid,
} = require("../middleware/datavalid");
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

router.post("/sendhelpemail",sendhelpemail)

router.get("/getuser", protect, getuser);
router.post("/login", validLogin, loginuser);

router.post(
  "/uploadprofilephoto",
  protect,
  upload.single("file"),
  saveUserPhoto
);
router.post("/updateaddressbook", protect, updateaddressbook);
//router.post("/saveaddressnonlogined",saveaddressnonlogined)
router.post("/updateuser", protect, updateuser);
router.post("/updatepassword", protect, updatepassword);
router.post("/addtowishlist", protect, addtowishlist);
router.get("/getwishlist", protect, getwishlist);
router.post("/sendcodetoverifyemail",sendCodeForVerifyEmail)
router.post("/checkrefer",checkrefer)

router.post("/create", validSignup, createuser);
router.post("/verifyemail", verifyemail);
router.post("/retrylink", sendlinkagain);
router.post("/finduserbynumber",getuserwithnumber)
router.post(
  "/resetpasswordmessage",
  resetpassvalidmessage,
  resetpasswithmessage
);
router.post("/verifycode", confirmcode);
router.post("/changepassword", protect, changepassword);
router.post("/confirmresetlink", confirmresetlink);
router.post(
  "/confirmpasscodewithmess",
  resetpassvalidmessage,
  resetpasswithmessage
);
router.post(
  "/resetpasswithemail",
  forgetemailpassvalid,
  forgotPasswordwithemail
);
router.post("/googleauthenticatesignup", googleControllersignup);
router.post("/googleauthenticatesignin", googleControllersignin);
router.post("/facebookauthenticatesignup", facebookControllersignup);
router.post("/facebookauthenticatesignin", facebookControllersignin);
router.post('/addnotification',protect,addnotification);
router.delete('/removenotification/:id',protect,removenotification)

// Admin Routes
router.post("/admingetusers",protect, getusers);
router.post("/getvendorriders",protect,getvendorriders)
router.post("/createuser",protect, createusers);
router.get("/getuser/:id",protect, getauser);
router.post("/edituser",protect, edituser);
router.post("/edituseraccess",protect, edituseraccess);
router.get("/getuserdetails/:id",protect, getusersdetails);


module.exports = router;
