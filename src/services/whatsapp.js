const { Client, LocalAuth } = require("whatsapp-web.js");
const Ev = require("../events");
const path = require("path");
const redis = require("../configs/redis");
const { log } = require("../utils");
const dataPath = path.resolve(path.dirname(""), "tmp", "wwebjs");

const MAX_TIME_CONNECT_IN_SECONDS = 30;
const MAX_TRY_CONNECT_QR = 5;

function WhatsApp() {
  let attempt = 0;

  const wpp = new Client({
    authStrategy: new LocalAuth({ dataPath }),
    puppeteer: { headless: true },
  });

  wpp.start = async () => {
    log("[Service] initializing session");
    await redis.delAsync("wpp_last_qr");
    await redis.setAsync("wpp_status", 100);
    Ev.emit("wpp_status", 100);
    wpp.initialize();
  };

  wpp.stop = async () => {
    log("[Service] deleting session");
    await redis.setAsync("wpp_status", 403);
    Ev.emit("wpp_status", 403);
    await redis.delAsync("wpp_last_qr");
    await wpp.logout();
    return;
  };

  const timeoutToInitialize = setTimeout(() => {
    log("[Service] max time to connection, retrying.");
    wpp.destroy().finally(() => {
      wpp.start();
    });
  }, MAX_TIME_CONNECT_IN_SECONDS * 1000);

  wpp.on("authenticated", async () => {
    clearTimeout(timeoutToInitialize);
    log("[Service] authenticated");
    await redis.setAsync("wpp_status", 200);
    await redis.delAsync("wpp_last_qr");
    Ev.emit("wpp_status", 200);
    return;
  });

  wpp.on("qr", async (qr) => {
    clearTimeout(timeoutToInitialize);

    attempt += 1;

    if (attempt === MAX_TRY_CONNECT_QR) {
      attempt = 0;
      log("[Service] max attemps to connection, closing session.");
      await redis.setAsync("wpp_status", 403);
      await redis.delAsync("wpp_last_qr");
      Ev.emit("wpp_status", 403);
      return await wpp.destroy();
    }

    log("[Service] session generated in service, attempt: " + attempt);
    await redis.setAsync("wpp_last_qr", qr, "ex", 60);
    await redis.setAsync("wpp_status", 102);
    Ev.emit("wpp_status", 102);
    Ev.emit("w1_qr", { qr });
    return;
  });

  wpp.on("auth_failure", () => {
    log("[Service] auth failure");
  });

  wpp.on("change_state", (state) => {
    log("[Service] change state to: " + state);
  });

  return wpp;
}

module.exports = WhatsApp;
