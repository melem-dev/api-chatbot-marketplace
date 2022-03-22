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
  if (!this.isModified("slug")) {
    this.slug = slug(this.title);
  }

  return next();
});

schema.pre("findOneAndUpdate", function (next) {
  this._update.slug = slug(this._update.title);
  return next();
});

const model = Model("/products", schema);

module.exports = model;
