const { Client, LegacySessionAuth } = require("whatsapp-web.js");
const Events = require("../events");

const wpp = new Client({
  authStrategy: new LegacySessionAuth(),
  session: false,
});

wpp.on("authenticated", (session) => {
  console.log(session);
});

wpp.on("qr", (qr) => {
  Events.emit("w1_qr", { qr });
});

wpp.on("message_create", (msg) => {
  console.log(msg);
});

const connect = () => {
  wpp.initialize();
};

const disconnect = () => {
  wpp.destroy();
};

const check_status = async () => {
  return await wpp.getState();
};

module.exports = {
  connect,
  disconnect,
  check_status,
};
