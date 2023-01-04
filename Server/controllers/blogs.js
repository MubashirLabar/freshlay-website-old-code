const Blog = require("../models/blog");
const sharp = require("sharp");
const checkaccess = require("../middleware/checkuseraccess");

exports.uploadsecondimg = async (req, res) => {
  try {
    const myfilename = `products/products-${"1212dqwdqw"}-${Date.now()}.jpeg`;
    req.file.filename = myfilename;
    sharp(req.file.buffer)
      .resize(1500, 1500)
      .toFormat("jpeg")
      .jpeg({ quality: 80 })
      .toFile(`public/${myfilename}`);

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.status(200).json({
      status: "success",
      myfilename,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      errors: "Error Creating role",
    });
  }
};

exports.modifyposts = async (req, res) => {
  console.log(JSON.parse(req.body.data));
  const access = await checkaccess(req.user.id, "blogging", "create");
  if (!access) {
    return res.status(422).json({
      errors: "You dont have access for this request",
    });
  }
  const { category, mainheading, paragraphitems, title, image1 } = JSON.parse(
    req.body.data
  );
  try {
    const myfilename = `products/products-${"1212dqwdqw"}-${Date.now()}.jpeg`;
    req.file.filename = myfilename;
    sharp(req.file.buffer)
      .resize(1500, 1500)
      .toFormat("jpeg")
      .jpeg({ quality: 80 })
      .toFile(`public/${myfilename}`);
    const blog = await Blog.create({
      category,
      mainheading,
      paragraphitems,
      image2: myfilename,
      //  image2 : myfilename2,
      image1,
      title,
    });
    res.status(200).json({
      status: "success",
      blog,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      errors: "Error Creating role",
    });
  }
};

exports.getblogs = async (req, res) => {
  //console.log(JSON.parse(req.body.data))
  try {
    const blogs = await Blog.find();
    res.status(200).json({
      status: "success",
      blogs,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      errors: "Error Creating role",
    });
  }
};

exports.getablog = async (req, res) => {
  //console.log(JSON.parse(req.body.data))
  try {
    const blog = await Blog.findById(req.params.id);
    res.status(200).json({
      status: "success",
      blog,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      errors: "Error getting blogs",
    });
  }
};

exports.deleteblogs = async (req, res) => {
  //console.log(JSON.parse(req.body.data))
  console.log(req.body);
  const access = await checkaccess(req.user.id, "blogging", "del");
  if (!access) {
    return res.status(422).json({
      errors: "You dont have access for this request",
    });
  }
  try {
    await Blog.findByIdAndDelete(req.body.id);
    res.status(200).json({
      status: "success",
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      errors: "Error Creating role",
    });
  }
};
