const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    prod_id: {
      type: Number,
    },
    label_en: {
      type: String,
      required: true,
    },
    // mongo did't accept urdu as a string, had to store it in array
    label_ur: {
      type: Array,
    },
    category: {
      type: String,
    },
    description: {
      type: String,
    },
    // product image
    media: {
      type: String,
    },
    // numReviews: {
    //  type: Number,

    //  default: 0,
    // },
    discount: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    status: {
      type: String,
      default: "active",
    },
    unit: {
      type: String,
    },
    stock: {
      type: Number,
      default: 0,
    },
    // number of total reviews
    numreviews : {
      type : Number,
      default : 0
    },
    avgrating : {
      type : Number,
      default : 0
    },
    chopped : {
      type : String,
      default : "Unchopped"
    },
    choppedimages : {
      type : Array
    }
    // rating
    // review
    // averagerating
  },
  {
    timestamps: true,

    // this two propeties are necessary when we use virtuals properties
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
//we can do something like this
//productSchema.virtual('discountprice', function () {
// retrun this.price / .....
//})
// whatever we can do this stuff here

productSchema.virtual("reviews", {
  ref: "reviews",
  foreignField: "productid",
  localField: "_id",
});

module.exports = Product = mongoose.model("Product", productSchema);
