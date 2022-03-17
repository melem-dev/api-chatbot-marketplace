const EventEmitter = require("events");
const { log } = require("../utils");

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

myEmitter.on("database_status", ({ status }) =>
  log(`Database status: ${status}`),
);

module.exports = myEmitter;
