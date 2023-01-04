const mongoose = require("mongoose");

const PackageSchema = mongoose.Schema(
  {
    // number of items list in a package/list
    packageitems: [
      {
        label_en: { type: String },
        qty: { type: Number },
        unit: { type: String },
        label_ur: {
          type: Array,
        },
      },
    ],
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    description: {
      type: String,
    },
    media: { type: String },
    price: { type: String },
    discount: { type: String },
    PKG_id: { type: String },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

module.exports = Package = mongoose.model("package", PackageSchema);
