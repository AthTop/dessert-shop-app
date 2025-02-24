const { Router } = require("express");
const deleteController = require("../controllers/deleteController");
const route = Router();

route.get("/:id", deleteController.getController);
route.post("/:id", deleteController.postController);
module.exports = route;
