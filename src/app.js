const { log } = require("./utils");

if (process.env.NODE_ENV !== "production") {
  log("[System] Ambient: Dev");
  require("dotenv").config();
} else {
  log("[System] Ambient: Production");
}

const express = require("express");
const http = require("http");
const app = express();

const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

const Events = require("./events");
const DB_MONGO = require("./configs/mongoose");
const DB_REDIS = require("./configs/redis");

const ws = require("./transporter");
ws(server, { cors: "*" });

server.listen(PORT, () => log("[Server] initialized"));
