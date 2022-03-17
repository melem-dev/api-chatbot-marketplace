const whatsapp = require("./whatsapp");
const telegram = require("./telegram");

whatsapp.connect();
telegram.connect();

module.exports = {
  whatsapp,
  telegram,
};
