const TelegramBot = require("node-telegram-bot-api");
const MAX_MINUTES_TO_REPLY = 5;
const SOURCE = "telegram";
const Events = require("../events");

const token = process.env.TELEGRAM_TOKEN;

const bot = new TelegramBot(token);

const arr_parse_int = (arr, lim) => {
  return arr.split(lim).map((el) => parseInt(el));
};

const filter_max_time = (date) => {
  const [dateMsg, timeMsg] = new Date(date * 1000).split(" ");
  const [dateActual, timeActual] = new Date().getDate(" ");

  if (dateMsg !== dateActual) return false;

  const [hourMsg, minuteMsg] = arr_parse_int(timeMsg, ":");
  const [hourActual, minuteActual] = arr_parse_int(timeActual, ":");

  const diff = hourActual * 60 + minuteActual - (hourMsg * 60 + minuteMsg);

  if (diff > MAX_MINUTES_TO_REPLY) return false;

  return true;
};

bot.on("message", (msg) => {
  const isReply = filter_max_time(msg.date);

  const details = {
    from: msg.client.id,
    text: msg.text,
    source: SOURCE,
  };

  if (!isReply) return;

  Events.emit("message_request", details);
});

Events.on("message_response", ({ from, text, source }) => {
  if (source !== SOURCE) return;

  return bot.sendMessage(from, text);
});

const connect = () => {
  bot.startPolling();
};

const disconnect = () => {
  bot.stopPolling();
};

const check_status = () => {
  bot.isPolling();
};

module.exports = { connect, disconnect, check_status };
