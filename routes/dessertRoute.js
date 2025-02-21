const { Router } = require("express");
const dessertController = require("../controllers/dessertController");
const route = Router();

route.get("/:id", dessertController.getController);
route.delete("/:id", dessertController.deleteController);
module.exports = route;
