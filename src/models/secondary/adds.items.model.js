const { Schema, model: Model } = require("mongoose");
const { MC_PRICE } = require("../constants");

const schema = new Schema({ item: { type: String }, price: { type: Number } });

schema.pre("save", function (next) {
  this.price = this.price * MC_PRICE;

  return next();
});

schema.pre("find", function (next) {
  this.price = this.price / MC_PRICE;

  return next();
});

const model = Model("/products/x/adds/items", schema);

module.exports = model;
