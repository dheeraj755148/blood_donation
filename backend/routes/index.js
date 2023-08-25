const express = require("express");
const route = express.Router();

const userRoutes = require("./user.routes")

route.use(userRoutes)

module.exports = route;
