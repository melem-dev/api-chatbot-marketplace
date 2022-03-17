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
const http = require("http");
const server = http.createServer(app);
const ws = require("./transporter");
ws(server, server, { cors: { origin: "*" } });

const Events = require("./events");
const Database = require("./configs/mongoose");
const Services = require("./services");

server.listen(PORT, () => log("Server on"));
