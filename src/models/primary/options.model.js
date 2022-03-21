const { Schema, model: Model } = require("mongoose");

const schema = new Schema(
  {
    title: { type: String },
    onlyOnce: { type: Boolean, default: true },
    items: [{ type: String }],
  },
  { timestamps: true },
);

const model = Model("/products/options", schema);

module.exports = model;
