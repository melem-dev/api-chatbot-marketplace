const { log } = require("./utils");

if (process.env.NODE_ENV !== "production") {
  log("ENV: Dev");
  require("dotenv").config();
} else {
  log("ENV: Production");
}

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

const Events = require("./events");
const Database = require("./configs/mongoose");

app.listen(PORT, () => log("Server on"));
