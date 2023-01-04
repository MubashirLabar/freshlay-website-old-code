const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    slotno : {
      type : Number
    },
    slotdate : {
      type : Date
    },
    orderItems: [
      {
        // type : String
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "OrderItems",
      },
    ],
    packages : [],
    orderlocation: {
      type: Object,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    riderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    orderstatus: {
      type: String,
      // requied : true,
      default: "pending",
    },
    paymentMethod: {
      type: String,
      // required: true,
    },
    orderId: {
      type: String,
    },
    savings: {
      type: String,
    },
    discountedprice: {
      type: String,
    },
    // shippingPrice: {
    //  type: Number,
    //   required: true,
    //   default: 0.0,
    // },
    deliverytype : {
      type : String
    },
    totalprice: {
      type: String,
      //   required: true,
      //  default: 0.0,
    },
    refercode : {
      type : String
    },
    rejected: {
      type: String,
    },
    deliverystatus: {
      type: Boolean,
      //  required: true,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
    approval: {
      type: String,
      default: "pending",
    },
    responded: {
      type: Boolean,
      default: false,
    },
    riderlocation : {
      type : Object
    },
    reviewed : {
      type : Boolean,
      default : false
    },
    paid : {
      type : Boolean,
      default : false
    },
    coupinname : {
      type : String
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

module.exports = Order = mongoose.model("Order", orderSchema);
