const { Schema, model: Model } = require("mongoose");

const schema = new Schema(
  {
    title: { type: String },
    items: [{ type: String }],
  },
  { timestamps: true },
);

const model = Model("/products/adds", schema);

module.exports = model;
