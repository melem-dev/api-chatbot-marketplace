const { log } = require("../../utils");
const _Services = require("../../controllers/services.controller");
const Redis = require("../../configs/redis");

/**
 * status:
 *  - Whats App
 *    100: 'loading'
 *    102: 'authenticating'
 *    200: 'connected'
 *    403: 'disconnected'
 */

async function handle({ io }) {
  const clients = io.sockets.adapter.rooms.get("services");

  for (const client of clients) {
    const socket = io.sockets.sockets.get(client);

    /* List of events room services */

    socket.on("check_services", async () => {
      const result = await _Services.getServicesStatus();
      socket.emit("services_status", result);
    });

    socket.on("connect_service", async () => {
      log("[Room Services] User attempt start session");

      const qr = await Redis.getAsync("wpp_last_qr");

      if (qr) {
        socket.emit("service_request", { type: "whats app", data: qr });
        return;
      }

      await _Services.openServiceConn({ target: "whats app" });

      return;
    });

    socket.on("disconnect_service", async () => {
      log("[Room Services] User closing session");

      await _Services.closeServiceConn({ target: "whats app" });

      const result = await _Services.getServicesStatus();

      return socket.emit("services_status", result);
    });

    socket.on("disconnect", async () => {
      // Verify status of whats app service and if state is "AUTHENTICATING"
      const status = await Redis.getAsync("wpp_status");

      // if quantity of users is 0, stop connection attempt
      if (status && status === 102) {
        await _Services.closeServiceConn({ target: "whatsapp" });
      }

      log("[Room Services] User Disconnected");
    });
  }
}

module.exports = handle;
