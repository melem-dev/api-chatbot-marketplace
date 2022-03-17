const { Server } = require("socket.io");
const Rooms = require("./rooms");
const Events = require("../events");
const { log } = require("../utils");

module.exports = (server, ...options) => {
  const ws = new Server(server, ...options);

  ws.on("connection", (socket) => {
    log("user connected");
    socket.emit("welcome", { status: "Olá!" });
  });

  Rooms.services(ws);
};
