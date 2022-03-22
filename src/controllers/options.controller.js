const mongoose = require("mongoose");
const { MP_Options, MP_Item } = require("../models");
const { log } = require("../utils");

module.exports = {
  create: async (req, res) => {
    try {
      log("[Controller] new option list");

      await MP_Options.validate(req.body);

      const { items } = req.body;

      if (typeof items == Array) throw Error("item data type is wrong");

      if (items.length === 0) throw Error("list of items is required");

      const itemsList = [];

      for (let x of items) {
        let item;

        let queryString = { $or: [{ title: x }, { slug: x }] };
        item = await MP_Item.findOne(queryString);

        if (item) {
          itemsList.push(item.id);
          continue;
        }

        if (mongoose.Types.ObjectId.isValid(x)) {
          item = await MP_Item.findById(x);

          if (item) {
            itemsList.push(item.id);
            continue;
          }
        }

        item = await MP_Item.create({ title: x });

        itemsList.push(item.id);
      }

      req.body.items = itemsList;

      await MP_Options.create(req.body);

      return res.sendStatus(201);
    } catch (error) {
      log("[Controller] error on create option list");
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
      log("[Controller] read all options list");
      const lists = await MP_Options.find();

      const sendList = [];

      for (let cont of lists) {
        const listItems = [];

        for (let itemId of cont.items) {
          // console.log(itemId);
          let { title } = await MP_Item.findById(itemId);
          listItems.push(title);
        }

        sendList.push({ ...cont._doc, items: listItems });
      }

      return res.status(200).json(sendList);
    } catch (error) {
      log("[Controller] error on capture options list");
      return res.status(500).json({ err: error.message });
    }
  },
  update: async (req, res) => {},
  exclude: async (req, res) => {},
  details: async (req, res) => {},
};
