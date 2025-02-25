const { Router } = require("express");
const categoryController = require("../controllers/categoryController");

const router = Router();

router.get("/", categoryController.newCategoryController);
router.get("/:id", categoryController.getController);
router.post("/", categoryController.newCategoryPostController);

module.exports = router;
