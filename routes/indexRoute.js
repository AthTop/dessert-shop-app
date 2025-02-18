const { Router } = require("express");
const indexController = require("../controllers/indexController");
const route = Router();

route.get("/", indexController.getController);

module.exports = route;