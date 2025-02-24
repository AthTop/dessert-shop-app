const { Router } = require("express");
const errorController = require("../controllers/errorController");
const route = Router();

route.get("/", errorController.getController);

module.exports = route;
