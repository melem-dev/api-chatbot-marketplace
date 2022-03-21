const { whatsapp } = require("../services");
const Events = require("../events");
const { log } = require("../utils");
const Redis = require("../configs/redis");

const Services = {
  "whats app": new whatsapp(),
};

async function startServicesOnInitSystem() {
  for (const service in Services) {
    if (service === "whats app") {
      Services[service].start();
    }
  }
}

startServicesOnInitSystem();

async function getServicesStatus() {
  const state = {
    "whats app": await Redis.getAsync("wpp_status"),
  };
  return state;
}

async function openServiceConn() {
  try {
    const status = await Redis.getAsync("wpp_status");

    if (status === "403") {
      log("[Controller] call start function");
      Services["whats app"].start();
      return true;
    }

    log("[Controller] not called");
  } catch (error) {
    log(error.message);
    return false;
  }
}

async function closeServiceConn(data) {
  try {
    const status = await Redis.getAsync("wpp_status");

    if (status !== 403) {
      await Services["whats app"].stop();
      return true;
    }
  } catch (error) {
    log(error.message);
    return false;
  }
}

module.exports = {
  getServicesStatus,
  openServiceConn,
  closeServiceConn,
};
