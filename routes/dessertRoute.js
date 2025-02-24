const { Router } = require("express");
const dessertController = require("../controllers/dessertController");
const route = Router();

route.get("/:id", dessertController.getController);
module.exports = route;
