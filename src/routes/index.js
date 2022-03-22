const app = require("express")();

const publicRoutes = require("./public");
app.use(publicRoutes);

module.exports = app;
