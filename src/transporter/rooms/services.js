module.exports = (ws) => {
  const ClientsServices = ws.sockets.adapter.rooms.get("services");

  for (const clientId in ClientsServices) {
    const ClientSocket = ws.sockets.sockets.get(clientId);

    ClientSocket.on("check_services", async () => {
      const Status = {
        "Whats App": await Services.whatsapp.check_status(),
        Telegram: Services.telegram.check_status(),
      };

      ClientSocket.emit("services_status", Status);
    });
  }
};
