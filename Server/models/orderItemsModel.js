const { text } = require("express");
const mongoose = require("mongoose");

const orderItemsSchema = mongoose.Schema(
  {
    label_en: { type: String },
    label_ur: {
      type: Array,
    },
    qty: { type: Number },
    price: { type: Number },
    discount : {type : Number},
    // chopped status in string, "chopped"/"unchopped"
    chopped : {
      type : String
    },
    choppedimg : {
      type : Array
    },
    category: {
      type: String,
    },
    media: { type: String },
    // unit selected
    unit: { type: String },
    // not populating referenced id, stored most of info here, better performance
    product: {
      // type : String
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Product",
    },
    prod_id: { type: String },
    // orginal unit of product
    orgunit : {type : String}
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

module.exports = OrderItems = mongoose.model("OrderItems", orderItemsSchema);
