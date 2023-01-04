const Settings = require("../models/Settings");
const User = require("../models/usermodel");
const Product = require("../models/productModel");
const OrderItems = require("../models/orderItemsModel");
const Review = require("../models/reviewmodel");
const Scale = require("../models/scales");
const sharp = require("sharp");
const orderItemsModel = require("../models/orderItemsModel");
const productModel = require("../models/productModel");
const Order = require("../models/orderModel");
const Productrequest = require("../models/productrequest");

// Reviews

exports.getreviews = async (req, res) => {
  try {
    console.log(req.body);
    let reviews;
    if (req.body.sorting.approval === "0") {
      reviews = await Review.find()
        .populate("userid", "fullname email")
        .populate("productid", "prod_id label_en")
        .sort({ $natural: -1 });
    } else {
      reviews = await Review.find(req.body.sorting)
        .populate("userid", "fullname email")
        .populate("productid", "prod_id label_en")
        .sort({ $natural: -1 });
    }
    res.status(200).json({
      status: "success",
      reviews,
    });
  } catch (error) {
    return res.status(422).json({
      errors: "Error getting Reviews",
    });
  }
};

exports.updatereviewapproval = async (req, res) => {
  try {
    const theproduct = await Review.findByIdAndUpdate(req.body.id, {
      approval: req.body.approval,
    });
    //const theproduct = await Review.findById(req.body.id)
    console.log(theproduct);
    if (req.body.approval === "approved") {
      const stat = await Review.aggregate([
        {
          $match: { productid: theproduct.productid },
        },
        {
          $group: {
            _id: "$productid",
            numreviews: { $sum: 1 },
            avgrating: { $avg: "$rating" },
          },
        },
      ]);
      console.log("stat", stat);

      await Product.findByIdAndUpdate(theproduct.productid, {
        avgrating: stat[0].avgrating,
        numreviews: stat[0].numreviews,
      });
    }
    res.status(200).json({
      status: "success",
    });
  } catch (error) {
    console.log(error);
    return res.status(422).json({
      errors: "Error getting Reviews",
    });
  }
};

// dashboard data

exports.getdashboarddata = async (req, res) => {
  try {
    const totaluser = await User.find({ role: "user" }).countDocuments();
    const totalvendor = await User.find({ role: "vendor" }).countDocuments();
    const activeproducts = await Product.find({
      status: "active",
    }).countDocuments();

    var today = new Date();
    var first = today.getDate() - 7;
    var firstDayWeek = new Date(today.setDate(first));
    const lastweekuploaded = await productModel.find({
      createdAt: { $gt: firstDayWeek },
    });
    const recentrequest = await Order.find({
      vendorId: req.user.id,
      responded: false,
    })
      .populate("userId")
      .sort({ $natural: -1 });
    const activeorders = await Order.find({
      vendorId: req.user.id,
      approval: "accepted",
      deliverystatus: false,
    })
      .populate("orderItems userId")
      .sort({ $natural: -1 });
    const productrequests = await Productrequest.find({ approval: "pending" })
      .populate("vendorId")
      .sort({ $natural: -1 });
    //console.log(productrequests)
    const topsaled = await orderItemsModel
      .aggregate([
        {
          $group: {
            _id: "$product",
            count: { $sum: "$qty" },
          },
        },
      ])
      .sort({ count: -1 });

    const topsaledpopulate = await Product.populate(topsaled, { path: "_id" });
    // console.log(topsaledpopulate)
    res.status(200).json({
      status: "success",
      data: {
        totaluser,
        totalvendor,
        activeproducts,
        topsaledpopulate,
        activeorders,
        recentrequest,
        lastweekuploaded,
        productrequests,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      errors: "Error Getting settings",
    });
  }
};

// Scales
exports.getsettings = async (req, res) => {
  try {
    const data = await Settings.find();
    const settings = data[0];
    // console.log(settings)
    res.status(200).json({
      status: "success",
      settings,
    });
  } catch (error) {
    res.status(404).json({
      errors: "Error Getting settings",
    });
  }
};

exports.getmetatag = async (req, res) => {
  try {
    const data = await Settings.find();
    const tags = data[0].headertags;
    // console.log(settings)
    // console.log(data)
    // console.log(tags)
    res.status(200).json({
      status: "success",
      data : "data",
      tags,
    });
  } catch (error) {
    res.status(404).json({
      errors: "Error Getting settings",
    });
  }
};

exports.updatesettingswithlogo = async (req, res) => {
  try {
    let data;
    if (!req.file) {
      data = JSON.parse(req.body.data);
    } else {
      const myfilename = `site/logo-${"1212dqwdqw"}-${Date.now()}`;
      req.file.filename = myfilename;
      sharp(req.file.buffer)
        .resize(1500, 1500)
        .toFormat("jpeg")
        .jpeg({ quality: 100 })
        .toFile(`public/${myfilename}`);
      data = { sitelogo: myfilename, ...JSON.parse(req.body.data) };
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
    const site = await Settings.find();
    console.log("length", site.length);

    if (site.length === 0) {
      await Settings.create(newdata);
    } else {
      const site_id = site[0]._id;
      await Settings.findByIdAndUpdate(site_id, newdata);
    }
    res.status(200).json({
      status: "success",
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      errors: "Error while creating user",
    });
  }
};

exports.updatebanners = async (req, res) => {
  try {
  } catch (error) {}
};

exports.updatesettings = async (req, res) => {
  try {
    const site = await Settings.find();
    if (site.length === 0) {
      await Settings.create(req.body);
    } else {
      const site_id = site[0]._id;
      await Settings.findByIdAndUpdate(site_id, req.body);
    }
    res.status(200).json({
      status: "success",
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      errors: "Error while creating user",
    });
  }
};
