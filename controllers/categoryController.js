const db = require("../db/queries");
const { body, validationResult } = require("express-validator");

const validateCategory = [
  body("catName").trim().notEmpty().withMessage("Category must have a name"),
];

exports.getController = async (req, res) => {
  const id = req.params.id;
  try {
    const category = await db.getCategoryById(id);
    if (category.length > 0) {
      // Handle uncategorized/categorized dessert cases
      let desserts;
      if (parseInt(id) === 1) {
        desserts = await db.getUncategorizedDesserts();
      } else {
        desserts = await db.getDessertsByCategory(id);
      }
      res.render("category", { title: category.id, desserts });
    }
  } catch {
    res
      .status(500)
      .render("error", { status: 500, error: "Internal server error" });
  }
};

exports.newCategoryController = async (req, res) => {
  res.render("addCategory", { title: "Add category" });
};

exports.newCategoryPostController = [
  validateCategory,
  async (req, res) => {
    const { catName } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("addCategory", {
        title: "Add category",
        catName,
        errors: errors.array(),
      });
    }
    try {
      await db.postCategory(catName);
      res.redirect("/");
    } catch {
      res
        .status(500)
        .render("error", { status: 500, error: "Internal server error" });
    }
  },
];
