const { Server } = require("socket.io");
const Events = require("../events");
const { log } = require("../utils");
const {
  checkStatus,
  disconnectService,
  connectService,
} = require("../controllers/services.controller");

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
      await checkStatus(socket);
    });

    socket.on("disconnect_service", ({ target }) => {
      log(`Serviços - Apagando sessão: ${target}`);
      disconnectService(socket, { target });
    });

    socket.on("connect_service", ({ target }) => {
      log(`Serviços - Gerando sessão: ${target}`);
      connectService({ target });
    });
  });

  Events.on("wpp_qr", ({ qr }) => {
    ws.to("services").emit("service_request", { type: "whats app", data: qr });
  });

  Events.on("telegram_token", () => {
    ws.to("services").emit("service_request", { type: "telegram" });
  });
};
