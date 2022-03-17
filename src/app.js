const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const { log } = require("./utils");

const Events = require("./services/events");

app.listen(PORT, () => log("Server on"));
