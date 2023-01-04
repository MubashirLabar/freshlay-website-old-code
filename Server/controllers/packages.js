const Package = require("../models/package");
const User = require("../models/usermodel");
const sharp = require("sharp");
const checkaccess = require("../middleware/checkuseraccess");

exports.addnewpackage = async (req, res) => {
  const access = await checkaccess(req.user.id, "packages", "create");
  if (!access) {
    return res.status(422).json({
      errors: "You dont have access for this request",
    });
  }
  try {
    if (!req.file) {
      return res.status(422).json({
        errors: "Please select an image",
      });
    }
    const myfilename = `products/package-${"1212dqwdqw"}-${Date.now()}.jpeg`;
    req.file.filename = myfilename;
    sharp(req.file.buffer)
      .resize(1500, 1500)
      .toFormat("jpeg")
      .jpeg({ quality: 80 })
      .toFile(`public/${myfilename}`);
    const recent = await Package.find().limit(1).sort({ $natural: -1 });
    let PKG_id;
    if (recent.length === 0) {
      PKG_id = "PKG-1";
    } else {
      const found_id = recent[0].PKG_id.split("-");
      PKG_id = Number(found_id[1]) + 1;
      PKG_id = `PKG-${PKG_id}`;
    }
    await Package.create({
      PKG_id,
      ...JSON.parse(JSON.parse(req.body.data)),
      media: myfilename,
    });
    res.status(200).json({
      status: "success",
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      errors: "Error Creating package",
    });
  }
};

exports.getnextpackageid = async (req, res) => {
  try {
    const recent = await Package.find().limit(1).sort({ $natural: -1 });
    let PKG_id;
    if (recent.length === 0) {
      PKG_id = "PKG-1";
    } else {
      const found_id = recent[0].PKG_id.split("-");
      PKG_id = Number(found_id[1]) + 1;
      PKG_id = `PKG-${PKG_id}`;
    }
    res.status(200).json({
      status: "success",
      PKG_id,
    });
  } catch (error) {
    res.status(404).json({
      errors: "Error package id",
    });
  }
};

exports.getpackage = async (req, res) => {
  try {
    console.log(req.params.id);
    const package = await Package.findById(req.params.id);
    res.status(200).json({
      status: "success",
      package,
    });
  } catch (error) {
    res.status(404).json({
      errors: "Error getting package",
    });
  }
};

exports.getallpackages = async (req, res) => {
  try {
    //console.log(req.body);
    const allpackages = await Package.find().sort({ $natural: -1 });
    res.status(200).json({
      status: "success",
      allpackages,
    });
  } catch (error) {
    res.status(404).json({
      errors: "Error getting all packages",
    });
  }
};

exports.getvendorpackages = async (req, res) => {
  try {
    const vendorpackages = await Package.find({ vendorId: req.user.id });
    res.status(200).json({
      status: "success",
      vendorpackages,
    });
  } catch (error) {
    res.status(404).json({
      errors: "Error getting packages",
    });
  }
};

exports.adminsearchandgetpackages = async (req, res) => {
  try {
    //console.log(req.body);
    const { keyword } = req.body;
    let allpackages;
    if (keyword === "" || keyword === null) {
      allpackages = await Package.find()
        .sort({ $natural: -1 })
        .populate("vendorId");
    } else {
      var regex = new RegExp([keyword].join(""), "i");
      allpackages = await Package.find({
        PKG_id: { $regex: regex },
      }).populate("vendorId");
      //allpackages = await Package.find({PKG_id : keyword});
    }

    res.status(200).json({
      status: "success",
      allpackages,
    });
  } catch (error) {
    res.status(404).json({
      errors: "Error Creating package",
    });
  }
};

exports.deletepackage = async (req, res) => {
  const access = await checkaccess(req.user.id, "packages", "del");
  if (!access) {
    return res.status(422).json({
      errors: "You dont have access for this request",
    });
  }
  try {
    await Package.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "success",
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      errors: "Error deleting package",
    });
  }
};
