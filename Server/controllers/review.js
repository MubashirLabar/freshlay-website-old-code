const Order = require("../models/orderModel");
const Review = require("../models/reviewmodel");
// getting reviews in get a product route

exports.createreview = async (req, res) => {
  const theorder = await Order.findOne({
    userId: req.user.id,
    _id: req.body.orderid,
  }).populate("orderItems");
  if (theorder) {
    if (theorder.reviewed) {
      return res.status(422).json({
        errors: "You already reviewed this order",
      });
    } else {
      theorder.orderItems.map(async (item, index) => {
        await Review.create({
          review: req.body.review,
          rating: req.body.rating,
          productid: item.product,
          userid: req.user.id,
        });
      });
      theorder.reviewed = true;
      await theorder.save();
    }
  } else {
    return res.status(422).json({
      errors: "You are not authorized to review this order",
    });
  }
};

exports.getproductreviews = async (req, res) => {
  try {
    const reviews = await Review.find({
      productid: req.params.id,
      approval: "approved",
    }).populate("userid", "fullname email media");
    res.status(200).json({
      status: "success",
      reviews,
    });
  } catch (error) {
    res.status(404);
    throw new Error("Error while getting product");
  }
};
