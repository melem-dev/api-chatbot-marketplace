const mongodb = require("mongoose");
const Events = require("../events");

const URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PWD}@cluster0.q36io.mongodb.net/${process.env.DB_COL}?retryWrites=true&w=majority`;

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const Cb = (err) => {
  let status = "on";

  if (err) status = err.message;

  Events.emit("database_status", { status });
};

mongodb.connect(URI, OPTIONS, Cb);

module.exports = mongodb;
