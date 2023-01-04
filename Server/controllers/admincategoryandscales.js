const Category = require("../models/category");
const Scale = require("../models/scales");
const sharp = require("sharp");
const category = require("../models/category");
const User = require("../models/usermodel");
const checkaccess = require("../middleware/checkuseraccess");

// Scales
exports.editscale = async (req, res) => {
  const access = await checkaccess(req.user.id, "scales", "edit");
  if (!access) {
    return res.status(422).json({
      errors: "You dont have access for this request",
    });
  }
  try {
    const { name, symbol, status, id } = req.body;
    await Scale.findByIdAndUpdate(req.body.id, { name, symbol, status });
    res.status(200).json({
      status: "success",
    });
  } catch (error) {
    return res.status(422).json({
      errors: "Error getting scales",
    });
  }
};

exports.deletescale = async (req, res) => {
  const access = await checkaccess(req.user.id, "scales", "del");
  if (!access) {
    return res.status(422).json({
      errors: "You dont have access for this request",
    });
  }
  try {
    await Scale.findByIdAndDelete(req.body.body);
    res.status(200).json({
      status: "success",
    });
  } catch (error) {
    return res.status(422).json({
      errors: "Error getting scales",
    });
  }
};
exports.getscales = async (req, res) => {
  try {
    let scales;
    if (req.body.status === "0") {
      scales = await Scale.find();
    } else {
      scales = await Scale.find(req.body);
    }
    res.status(200).json({
      status: "success",
      scales,
    });
  } catch (error) {
    return res.status(422).json({
      errors: "Error getting scales",
    });
  }
};

exports.addscale = async (req, res) => {
  const access = await checkaccess(req.user.id, "scales", "create");
  if (!access) {
    return res.status(422).json({
      errors: "You dont have access for this request",
    });
  }
  try {
    console.log(req.body);
    await Scale.create(req.body);
    res.status(200).json({
      status: "success",
    });
  } catch (error) {
    return res.status(422).json({
      errors: "Error Creating scale",
    });
  }
};

// Categories

exports.deletecategory = async (req, res) => {
  try {
    const access = await checkaccess(req.user.id, "categories", "del");
    if (!access) {
      return res.status(422).json({
        errors: "You dont have access for this request",
      });
    }
    await category.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "success",
    });
  } catch (error) {
    return res.status(422).json({
      errors: "Error deleting category",
    });
  }
};

exports.editcategory = async (req, res) => {
  const access = await checkaccess(req.user.id, "categories", "edit");
  if (!access) {
    return res.status(422).json({
      errors: "You dont have access for this request",
    });
  }
  try {
    let data;
    const thedata = JSON.parse(req.body.data);
    if (!req.file) {
      data = thedata;
    } else {
      const myfilename = `site/logo-${"1212dqwdqw"}-${Date.now()}.jpeg`;
      req.file.filename = myfilename;
      sharp(req.file.buffer)
        .resize(1500, 1500)
        .toFormat("jpeg")
        .jpeg({ quality: 100 })
        .toFile(`public/${myfilename}`);
      data = { image: myfilename, ...thedata };
    }
    function clean(data) {
      for (var propName in data) {
        if (data[propName] === null || data[propName] === undefined) {
          delete data[propName];
        }
      }
      return data;
    }
    const newdata = clean(data);
    await Category.findOneAndUpdate({ cat_id: thedata.cat_id }, newdata);
    res.status(200).json({
      status: "success",
    });
  } catch (error) {
    console.log(error);
    return res.status(422).json({
      errors: "Error saving data",
    });
  }
};

exports.addcategory = async (req, res) => {
  try {
    const access = await checkaccess(req.user.id, "categories", "create");
    if (!access) {
      return res.status(422).json({
        errors: "You dont have access for this request",
      });
    }
    if (!req.file) {
      return res.status(422).json({
        errors: "Please select an image",
      });
    }
    const myfilename = `category/category-${"1212dqwdqw"}-${Date.now()}.jpeg`;
    req.file.filename = myfilename;
    sharp(req.file.buffer)
      .resize(1500, 1500)
      .toFormat("jpeg")
      .jpeg({ quality: 100 })
      .toFile(`public/${myfilename}`);
    const data = JSON.parse(req.body.data);
    const totalcat = await Category.find().countDocuments();
    let id;
    if (totalcat <= 0) {
      id = 1;
    } else {
      const recent = await Category.find().limit(1).sort({ $natural: -1 });
      id = recent[0].cat_id + 1;
    }
    const body = {
      cat_id: id,
      name: data.name,
      status: data.status,
      image: myfilename,
      description: data.description,
    };
    const product = await Category.create(body);
    res.status(200).json({
      status: "success",
    });
  } catch (error) {
    console.log(error);
    return res.status(422).json({
      errors: "Error saving data",
    });
  }
};

exports.getallcategories = async (req, res) => {
  try {
    let categories;
    if (req.body.status === "0") {
      categories = await Category.find();
    } else {
      categories = await Category.find(req.body);
    }
    res.status(200).json({
      status: "success",
      categories,
    });
  } catch (error) {
    res.status(404);
    throw new Error("Error getting all categories");
  }
};

exports.getacategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    res.status(200).json({
      status: "success",
      category,
    });
  } catch (error) {}
};
