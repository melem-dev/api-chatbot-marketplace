const { Server } = require("socket.io");
const { log } = require("../utils");
const RoomService = require("./rooms/service");
const Events = require("../events");
const _Services = require("../controllers/services.controller");

module.exports = (server, options) => {
  const io = new Server(server, options);

  io.on("connection", (socket) => {
    socket.emit("welcome");

    socket.on("join_room", ({ room, auth }) => {
      socket.join(room);
      socket.emit("accept_in_room", { room });

      if (room === "services") {
        log("[Room Services] User joined");
        RoomService({ io, socket });
      }
    });
  });

  Events.on("w1_qr", async ({ qr }) => {
    Events.emit("services_change_status");
    log("[Transporter] QR Code send");
    const response = { type: "whats app", data: qr };
    return io.to("services").emit("service_request", response);
  });

  Events.on("w1_ready", async () => {
    const result = await _Services.getServicesStatus();
    log("[Transpoter] States send");
    return io.to("services").emit("services_status", result);
  });

  Events.on("wpp_status", async () => {
    const result = await _Services.getServicesStatus();
    log("[Transpoter] States send");
    return io.to("services").emit("services_status", result);
  });
};
