const mongoose = require("mongoose");

const scalesschema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    symbol: {
      type: String,
    },
    status: {
      type: String,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

module.exports = mongoose.model("scales", scalesschema);
