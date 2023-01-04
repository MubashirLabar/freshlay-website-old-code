const mongoose = require("mongoose");
const { bool } = require("sharp");

const productrequestSchema = mongoose.Schema(
  {
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Product",
    },
    stock: {
      type: Number,
    },
    oldstock : {
      type : Number,
    },
    category: {
      type: String,
    },
    approval: {
      type: String,
      default: "pending",
    },
    // rejected with reason
    rejected: {
      type: String,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

module.exports = ProductRequest = mongoose.model(
  "Productrequests",
  productrequestSchema
);
