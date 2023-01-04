const mongoose = require("mongoose");

const categoryschema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    cat_id: {
      type: Number,
    },
    status: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

module.exports = mongoose.model("category", categoryschema);
