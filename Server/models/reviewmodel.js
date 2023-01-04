const mongoose = require("mongoose");

const reviewschema = mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, "Must have a review"],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: [true, "Review must have rating"],
    },
    productid: {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
      required: [true, "review must belong to tour"],
    },
    userid: {
      type: mongoose.Schema.ObjectId,
      ref: "user",
      required: true,
    },
    approval : {
      type : String,
      default : "pending"
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// name sould be the name you written in tourmodel.js not in mongodb
//reviewschema.pre(/^find/, function(next) {
//   this.populate({
//      path : 'tour'
//  })
// .populate({
//     path : 'user',
//   select :   'name createdat email photo'
// })
// next();
//})

module.exports = mongoose.model("reviews", reviewschema);
