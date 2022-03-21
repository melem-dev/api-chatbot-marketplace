const { Schema, model: Model } = require("mongoose");
const { slug } = require("../../utils");
const { MC_PRICE } = require("../constants");

const schema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String },
    price: { type: Number, required: true },
    available: { type: Boolean, default: true },
    options: [{ type: String }],
    adds: { type: String },
  },
  { timestamps: true },
);

schema.pre("save", function (next) {
  this.slug = slug(title);
  this.price = this.price * MC_PRICE;

  return next();
});

schema.pre("find", function (next) {
  this.price = this.price / MC_PRICE;

  return next();
});

const model = Model("/products", schema);

module.exports = model;
