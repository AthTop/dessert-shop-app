const { Router } = require("express");
const addController = require("../controllers/addController");
const route = Router();

route.get("/", addController.getController);
route.post("/", addController.postController);

module.exports = route;
