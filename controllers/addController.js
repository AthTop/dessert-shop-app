const db = require("../db/queries");
const { body, validationResult } = require("express-validator");

const priceErr = "must be a number";
const urlErr = "must be valid";
const validateDessert = [
  body("name").trim().notEmpty().withMessage(`Name is required`),
  body("price")
    .trim()
    .isNumeric()
    .withMessage(`Price ${priceErr}`)
    .notEmpty()
    .withMessage(`Price is required`),
  body("imageurl")
    .optional({ values: "falsy" })
    .trim()
    .isURL()
    .withMessage(`Image URL ${urlErr}`),
];

exports.getController = async (req, res) => {
  const categories = await db.getAllCategories();
  res.render("add", { title: "New Dessert", categories });
};

exports.postController = [
  validateDessert,
  async (req, res) => {
    try {
      const name = req.body.name;
      const price = req.body.price;
      const description = req.body.description || null;
      const image_url = req.body.imageurl || null;
      const categories = req.body.categories;
      const categoriesIds = new Set(
        categories.map((categoryId) => parseInt(categoryId))
      );
      const errors = validationResult(req);
      const params = { name, price, description, image_url, categoriesIds };
      if (!errors.isEmpty()) {
        const allCategories = await db.getAllCategories();
        return res.status(400).render("add", {
          title: "New Dessert",
          errors: errors.array(),
          categories: allCategories,
          params,
        });
      }
      const result = await db.postDessert(name, price, description, image_url);
      const dessertId = result[0].id;
      if (categories && categories.length > 0) {
        for (const category of categories) {
          await db.postNewRelation(dessertId, parseInt(category));
        }
      }
      res.redirect("/");
    } catch (error) {
      res
        .status(500)
        .render("error", { status: 500, error: "Internal server error" });
    }
  },
];
