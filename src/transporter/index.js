const { Server } = require("socket.io");
const Events = require("../events");
const { log } = require("../utils");
const Services = require("../services");

module.exports = (server, ...options) => {
  const ws = new Server(server, ...options);

  ws.on("connection", (socket) => {
    socket.emit("welcome", { status: "Olá!" });

    socket.on("join_room", ({ room, token }) => {
      if (room.toLowerCase() == "services") {
        // Validação de token
        socket.join(room);
        socket.emit("accept_in_room", { room });
      }
    });

    socket.on("check_services", async () => {
      const clients = ws.sockets.adapter.rooms.get("services");

      if (!clients.has(socket.id)) return socket.emit("permission_denied");

      const Status = {
        "Whats App": await Services.whatsapp.check_status(),
        Telegram: Services.telegram.check_status(),
      };

      return socket.emit("services_status", Status);
    });

    socket.on("disconnect_service", ({ target }) => {
      if (target.toUpperCase() === "whats app") {
        Services.whatsapp.disconnect();
        return socket.emit('')
      }

      if (target.toUpperCase() === "telegram") {
        return Services.telegram.disconnect();
      }
    });
  });
};
