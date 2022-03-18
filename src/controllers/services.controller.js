const Events = require("../events");
const Services = require("../services");

/* Funções */

const checkStatus = async (socket) => {
  const clients = ws.sockets.adapter.rooms.get("services");

  if (!clients.has(socket.id)) return socket.emit("permission_denied");

  const Status = {
    "Whats App": await Services.whatsapp.check_status(),
    Telegram: Services.telegram.check_status(),
  };

  return socket.emit("services_status", Status);
};

const disconnectService = (socket, { target }) => {
  if (target.toUpperCase() === "whats app") {
    Services.whatsapp.disconnect();
    return socket.emit("services_change_status");
  }

  if (target.toUpperCase() === "telegram") {
    Services.telegram.disconnect();
    return socket.emit("services_change_status");
  }
};

const connectService = ({ target }) => {
  if (target.toLowerCase() === "whats app") {
    Services.whatsapp.connect();
  }

  if (target.toLowerCase() === "telegram") {
    Services.telegram.connect();
  }
};

module.exports = {
  checkStatus,
  disconnectService,
  connectService,
};
