const Orders = require("../models/orderModel");
const Product = require("../models/productModel");
const sharp = require("sharp");
const checkaccess = require("../middleware/checkuseraccess");
// ADMIN CONTROLLERS

exports.pricelist = async (req, res) => {
  try {
    let allproducts;
    const category = req.body.filterproduct.category;
    const sorting = req.body.filterproduct.sorting;
    if (category !== "all") {
      allproducts = await Product.find({
        category: category,
      }).sort(sorting);
    } else {
      allproducts = await Product.find({
        // status
      }).sort(sorting);
    }
    res.status(200).json({
      status: "success",
      Pricelist: allproducts,
    });
  } catch (error) {
    res.status(404);
    throw new Error("Error getting all products");
  }
};

exports.editproduct = async (req, res) => {
  const data = JSON.parse(req.body.data);
  let body;
  const access = await checkaccess(req.user.id, "products", "edit");
  if (!access) {
    return res.status(422).json({
      errors: "You dont have access for this request",
    });
  }
  if (!req.file) {
    body = {
      ...data,
      label_ur: [{ value: data.label_ur }],
      price: parseInt(data.price),
      discount: parseInt(data.discount),
    };
  } else {
    const myfilename = `products/products-${"1212dqwdqw"}-${Date.now()}.png`;
    req.file.filename = myfilename;
    // storing image
    sharp(req.file.buffer)
      //.resize(1500, 1500)
      //.toFormat("jpeg")
      //.jpeg({ quality: 80 })
      .toFile(`public/${myfilename}`);
    body = {
      ...data,
      label_ur: [{ value: data.label_ur }],
      price: parseInt(data.price),
      discount: parseInt(data.discount),
      media: myfilename,
    };
  }

  try {
    // const product =
    await Product.findByIdAndUpdate(data.id, body);

    res.status(200).json({
      status: "success",
    });
  } catch (error) {
    console.log(error);
    return res.status(422).json({
      errors: "Error saving a new product",
    });
  }
};

exports.relatedproduct = async (req, res) => {
  try {
    const products = await Product.find({status: "active", category: req.body.category });
    res.status(200).json({
      status: "success",
      products,
    });
  } catch (error) {
    return res.status(422).json({
      errors: "Error getting related product",
    });
  }
};

exports.getonboardproducts = async (req, res) => {
  try {
    const products = await Product.find({ status: "active" });
    res.status(200).json({
      status: "success",
      products,
    });
  } catch (error) {
    return res.status(422).json({
      errors: "Error getting a product",
    });
  }
};

exports.deleteaproduct = async (req, res) => {
  const access = await checkaccess(req.user.id, "products", "del");
  if (!access) {
    return res.status(422).json({
      errors: "You dont have access for this request",
    });
  }
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "success",
      product,
    });
  } catch (error) {
    return res.status(422).json({
      errors: "Error deleting a product",
    });
  }
};

exports.getnextproductid = async (req, res) => {
  try {
    const recent = await Product.find().limit(1).sort({ $natural: -1 });
    if (recent.length === 0) {
      id = 1;
    } else {
      id = recent[0].prod_id + 1;
    }
    res.status(200).json({
      status: "success",
      product_id: id,
    });
  } catch (error) {
    console.log(error);
    return res.status(422).json({
      errors: "Error getting next product id",
    });
  }
};

exports.adminproductslist = async (req, res) => {
  try {
    let allproducts;
    const category = req.body.filterproduct.category;
    const sorting = req.body.filterproduct.sorting;
    const status = req.body.filterproduct.status;
    if (status === "all" && category !== "all") {
      allproducts = await Product.find({
        category,
      }).sort(sorting);
    } else if (status !== "all" && category === "all") {
      allproducts = await Product.find({ status: status }).sort(sorting);
    } else if (status === "all" && category === "all") {
      allproducts = await Product.find().sort(sorting);
    } else if (status !== "all" && category !== "all") {
      allproducts = await Product.find({ status: status, category }).sort(
        sorting
      );
    } else {
      allproducts = await Product.find({}).sort(sorting);
    }
    res.status(200).json({
      status: "success",
      Products: allproducts,
    });
  } catch (error) {
    console.log(error);
    res.status(404);
    throw new Error("Error getting all products");
  }
};
exports.updateproduct = async (req, res) => {
  try {
    const theproduct = await Product.findOneAndUpdate(
      req.body.id,
      req.body.data,
      { new: true }
    );
    // not getting updated product
    res.status(200).json({
      status: "success",
      product: theproduct,
    });
  } catch (error) {
    res.status(404);
    throw new Error("Error while editing a product");
  }
};

exports.uploadchoppedimages = async (req, res) => {
  console.log("got those files", req.files);
  let imagespaths = [];
  req.files.map((val) => {
    imagespaths.push(val.filename);
  });
  try {
    res.status(200).json({
      status: "success",
      imagespaths,
    });
  } catch (error) {
    return res.status(422).json({
      errors: "Error Creating a new product",
    });
  }
};

exports.createproduct = async (req, res) => {
  console.log(req.body);
  const access = await checkaccess(req.user.id, "products", "create");
  if (!access) {
    return res.status(422).json({
      errors: "You dont have access for this request",
    });
  }
  const data = JSON.parse(req.body.data);

  if (!req.file) {
    return res.status(422).json({
      errors: "Please select an image",
    });
  }

  try {
    const myfilename = `products/products-${"1212dqwdqw"}-${Date.now()}.png`;
    req.file.filename = myfilename;
    sharp(req.file.buffer)
      //.resize(1500, 1500)
      //.toFormat("jpeg")
      //.jpeg({ quality: 80 })
      .toFile(`public/${myfilename}`);
    const totalprod = await Product.find().countDocuments();

    let id;
    if (totalprod <= 0) {
      id = 1;
    } else {
      const recent = await Product.find().limit(1).sort({ $natural: -1 });
      id = recent[0].prod_id + 1;
    }
    const body = {
      label_en: data.label_en,
      label_ur: [{ value: data.label_ur }],
      price: parseInt(data.price),
      discount: parseInt(data.discount),
      status: data.status,
      unit: data.unit,
      description: data.description,
      media: myfilename,
      chopped: data.chopped,
      choppedimages: data.choppedimages,
      prod_id: id,
      category: data.category,
    };
    await Product.create(body);
    res.status(200).json({
      status: "success",
    });
  } catch (error) {
    return res.status(422).json({
      errors: "Error Creating a new product",
    });
  }
};

// USERS CONTROLLERS

exports.popularproducts = async (req, res) => {
  try {
    const popularfruits = await Product.find({
      category: "fruits",
      status: "active",
    })
      .sort("-avgrating")
      .limit(15);
    const popularvegetables = await Product.find({
      category: "vegetables",
      status: "active",
    })
      .sort("-avgrating")
      .limit(15);
    const populargroceries = await Product.find({
      category: "grocery",
      status: "active",
    })
      .sort("-avgrating")
      .limit(15);
    //console.log('popular',populargroceries)
    res.status(200).json({
      status: "success",
      popularfruits,
      popularvegetables,
      populargroceries,
    });
  } catch (error) {
    res.status(404);
    throw new Error("Error while getting popular product");
  }
};

exports.get50product = async (req, res) => {
  try {
    const randomproducts = await Product.aggregate([{ $sample: { size: 3 } }]);
    res.status(200).json({
      status: "success",
    });
  } catch (error) {
    res.status(404);
    throw new Error("Error while getting product");
  }
};

exports.getallproduct = async (req, res) => {
  try {
    const allproducts = await Product.find({ status: "active" });
    res.status(200).json({
      status: "success",
      Products: allproducts,
    });
  } catch (error) {
    res.status(404);
    throw new Error("Error getting all products");
  }
};

exports.searchproducts = async (req, res) => {
  try {
    const keyword = req.body.search.searchdata;
    var regex = new RegExp([keyword].join(""), "i");
    const products = await Product.find({
      status: "active",
      label_en: { $regex: regex },
      // label_en: { $regex: new RegExp(req.body.search.searchdata) },
    })
      .skip(req.body.search.skip)
      .limit(10);
    const totalproducts = await Product.find({
      status: "active",
      label_en: { $regex: regex },
    }).countDocuments();
    res.status(200).json({
      products,
      totalproducts,
    });
  } catch (error) {
    res.status(404);
    throw new Error("Error getting these products");
  }
};

exports.appfilterandsearchproducts = async (req, res) => {
  var regex = new RegExp([req.body.searchtext].join(""), "i");
  let filterproducts;
  let totalproducts;

  try {
    if (req.body.searchtext.length > 0) {
      filterproducts = await Product.find({
        status: "active",
        ...req.body.filterdata,
        label_en: { $regex: regex },
      });

      totalproducts = await Product.find({
        status: "active",
        label_en: { $regex: regex },
        ...req.body.filterdata,
      }).countDocuments();
    } else {
      filterproducts = await Product.find({
        status: "active",
        ...req.body.filterdata,
      })
        .skip(req.body.skip)
        .limit(10)
        .sort(req.body.sorting);

      totalproducts = await Product.find({
        status: "active",
        ...req.body.filterdata,
      }).countDocuments();
    }
    res.status(200).json({
      products: filterproducts,
      totalproducts,
    });
  } catch (error) {
    res.status(404);
    throw new Error("Error getting these products");
  }
};

exports.filterproducts = async (req, res) => {
  try {
    console.log(req.body)
    const filterproduct = await Product.find({
      status: "active",
      ...req.body.filterdata,
    }).skip(req.body.skip)
      .limit(10)
      .sort(req.body.sorting);

    const totalproducts = await Product.find({
      status: "active",
      ...req.body.filterdata,
    }).countDocuments();
    if (req.body.skip > 0) {
      res.status(200).json({
        status: "active",
        updatedproducts: filterproduct,
        totalproducts,
      });
    } else {
      res.status(200).json({
        products: filterproduct,
        totalproducts,
      });
    }
  } catch (error) {
    res.status(404);
    throw new Error("Error getting these products");
  }
};

exports.getlandingproductfilter = async (req, res) => {
  try {
    const theproducts = await Product.find({
      status: "active",
      ...req.body.filter,
    })
      .sort({ $natural: -1 })
      .countDocuments();
    const filterproduct = await Product.find({ status: "active" })
      .sort({ $natural: -1 })
      .skip(req.body.skip)
      .limit(10);
    if (req.body.skip > 0) {
      res.status(200).json({
        updatedproducts: filterproduct,
        totalproduct: theproducts,
      });
    } else {
      res.status(200).json({
        products: filterproduct,
        totalproduct: theproducts,
      });
    }
  } catch (error) {
    res.status(404);
    throw new Error("Error getting these products");
  }
};

exports.getaproduct = async (req, res) => {
  try {
    // nested population worked
    const product = await Product.findById(req.params.id).populate({
      path: "reviews",
      populate: { path: "userid" },
    });

    if (product) {
      res.status(200).json({
        status: "success",
        product,
      });
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  } catch (error) {
    res.status(404);
    throw new Error("Error while getting product");
  }
};
