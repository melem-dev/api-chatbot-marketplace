const express = require("express");
const http = require("http");
const cors = require("cors");

const app = express();

const { log } = require("./utils");

if (process.env.NODE_ENV !== "production") {
  log("[System] Ambient: Dev");
  const dotenv = require("dotenv").config();
  const morgan = require("morgan");
  app.use(morgan("dev"));
} else {
  log("[System] Ambient: Production");
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const routes = require("./routes");
app.use(routes);

const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

const Events = require("./events");
const DB_MONGO = require("./configs/mongoose");
const DB_REDIS = require("./configs/redis");

const ws = require("./transporter");
ws(server, { cors: "*" });

server.listen(PORT, () => log("[Server] initialized"));
