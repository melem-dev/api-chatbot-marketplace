const mongoose = require("mongoose");
const { MP_Product, MP_Item } = require("../models");
const { log } = require("../utils");

module.exports = {
  create: async (req, res) => {
    try {
      log("[Controller] new product");

      await MP_Product.validate(req.body);

      await MP_Product.create(req.body);

      return res.sendStatus(201);
    } catch (error) {
      log("[Controller] error in register new product");
      if (error instanceof mongoose.Error) {
        const fields = Object.keys(error.errors);
        let err = [];
        for (let x of fields) {
          err.push(error.errors[x].properties);
        }
        return res.status(400).json(err);
      }
      return res.status(500).json({ err: error.message });
    }
  },
  read: async (req, res) => {
    try {
      log("[Controller] read all products");
      const Products = await MP_Product.find();
      return res.status(200).json(Products);
    } catch (error) {
      log("[Controller] error to read products");
      return res.status(500).json({ err: error.message });
    }
  },
  update: async (req, res) => {
    try {
      log("[Controller] update product");
      const { id } = req.params;
      await MP_Product.findByIdAndUpdate(id, req.body);
      return res.sendStatus(200);
    } catch (error) {
      log("[Controller] error on update product");
      return res.status(500).json({ err: error.message });
    }
  },
  exclude: async (req, res) => {
    try {
      log("[Controller] deleting product");
      const { id } = req.params;
      await MP_Product.findByIdAndDelete(id, req.body);
      return res.sendStatus(200);
    } catch (error) {
      log("[Controller] error on update product");
      return res.status(500).json({ err: error.message });
    }
  },
  details: async (req, res) => {
    try {
      log("[Controller] get details of product");
      const { id } = req.params;
      let Product = await MP_Product.findById(id, req.body);

      if (Product) return res.status(200).json(Product);

      Product = await MP_Product.findOne({
        $or: [{ title: id }, { slug: id }],
      });

      if (Product) return res.status(200).json(Product);

      return res.sendStatus(404);
    } catch (error) {
      log("[Controller] error on update product");
      return res.status(500).json({ err: error.message });
    }
  },
  items: async (req, res) => {
    try {
      const items = await MP_Item.find();
      log("[Controller] get all items");
      return res.status(200).json(items);
    } catch (error) {
      log("[Controller] error on capture items");
      return res.status(500).json({ err: error.message });
    }
  },
};
