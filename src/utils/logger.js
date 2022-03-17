module.exports = (...msgs) => {
  for (let msg of msgs) {
    const actualHour = new Date().toLocaleString("pt-br").split(" ")[1];

    console.log(`[${actualHour}] ${msg}`);
  }
};
