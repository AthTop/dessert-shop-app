const { Router } = require("express");
const categoryController = require("../controllers/categoryController");

const router = Router();

router.get("/:id", categoryController.getController);

module.exports = router;
