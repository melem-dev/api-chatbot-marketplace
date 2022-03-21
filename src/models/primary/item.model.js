const { Schema, model: Model } = require("mongoose");
const { slug } = require("../../utils");

const schema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String },
  },
  { timestamps: true },
);

schema.pre("save", function (next) {
  this.slug = slug(title);

  return next();
});

const model = Model("/products/items", schema);

module.exports = model;
