const { Server } = require("socket.io");
const Services = require("../services");
const Events = require("../events");

module.exports = (...options) => {
  const ws = new Server(...options);

  ws.on("connection", (socket) => {
    socket.emit("welcome", { status: "Olá!" });
  });

  const ClientsServices = ws.sockets.adapter.rooms.get("services");

  for (const clientId in ClientsServices) {
    const ClientSocket = ws.sockets.sockets.get(clientId);

    ClientSocket.on("check_services", () => {
      const Status = {
        "Whats App": true,
        Telegram: Services.telegram.check_status(),
      };

      ClientSocket.emit("services_status", Status);
    });
  }
};
