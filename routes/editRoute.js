const { Router } = require("express");
const editController = require("../controllers/editController");
const route = Router();

route.get("/:id", editController.getController);
route.post("/:id", editController.postController);
module.exports = route;
