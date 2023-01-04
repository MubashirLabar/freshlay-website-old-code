const Productrequest = require("../models/productrequest");
const Product = require("../models/productModel");

exports.responseproductrequest = async (req, res) => {
  try {
    const { approval, rejected, id } = req.body;
    //console.log(req.body)
    if (approval === "accepted") {
      const therequest = await Productrequest.findById(id);
      const product = await Product.findById(therequest.productId);
      product.stock = product.stock + therequest.stock;
      await product.save();
    }
    const productrequest = await Productrequest.findByIdAndUpdate(
      id,
      { rejected, approval },
      { new: true }
    );
    res.status(200).json({
      status: "success",
      approval,
      productrequest,
    });
  } catch (error) {
    res.status(404).json({
      errors: "Error sending request",
    });
  }
};

exports.createproductrequest = async (req, res) => {
  try {
    const product = await Product.findById(req.body.productId);
    const oldstock = product.stock;
    const productrequest = await Productrequest.create({
      vendorId: req.user.id,
      ...req.body,
      oldstock,
    });
    res.status(200).json({
      status: "success",
      productrequest,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      errors: "Error sending request",
    });
  }
};

exports.getproductrequest = async (req, res) => {
  try {
    let allproductrequest;
    const { filter } = req.body;
    console.log(filter);
    if (Object.entries(req.body).length === 0) {
      allproductrequest = await Productrequest.find()
        .populate("productId vendorId")
        .sort({ $natural: -1 });
    } else if (filter.category !== "all" && filter.approval === "all") {
      allproductrequest = await Productrequest.find({
        category: filter.category,
        createdAt: {
          $gt: req.body.filter.date.fromDate,
          $lt: req.body.filter.date.toDate,
        },
      }).populate("productId vendorId");
    } else if (filter.category === "all" && filter.approval !== "all") {
      //  console.log('hi2')
      allproductrequest = await Productrequest.find({
        approval: filter.approval,
        createdAt: {
          $gt: req.body.filter.date.fromDate,
          $lt: req.body.filter.date.toDate,
        },
      }).populate("productId vendorId");
    } else if (filter.category === "all" && filter.approval === "all") {
      //console.log('hi2')
      allproductrequest = await Productrequest.find(
        //  {category : filter.category}, {approval : filter.approval}
        //,
        {
          createdAt: {
            $gt: req.body.filter.date.fromDate,
            $lt: req.body.filter.date.toDate,
          },
        }
      ).populate("productId vendorId");
    } else if (filter.category !== "all" && filter.approval !== "all") {
      allproductrequest = await Productrequest.find(
        //  {category : filter.category}, {approval : filter.approval}
        //,
        {
          category: filter.category,
          approval: filter.approval,
          createdAt: {
            $gt: req.body.filter.date.fromDate,
            $lt: req.body.filter.date.toDate,
          },
        }
      ).populate("productId vendorId");
    }

    res.status(200).json({
      status: "success",
      allproductrequest,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      errors: "Error sending request",
    });
  }
};
