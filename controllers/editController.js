const db = require("../db/queries");

exports.getController = async (req, res) => {
  const { id } = req.params;
  const error = req.query.error;
  try {
    const resultDessert = await db.getDessertById(id);
    const categories = await db.getAllCategories();
    if (resultDessert.length > 0 && resultDessert[0]) {
      const dessert = resultDessert[0];
      const dessertCategories = await db.getDessertCategories(id);
      const dessertCategoriesIds = new Set(
        dessertCategories.map((cat) => cat.category_id)
      );
      res.render("edit", {
        title: "Edit",
        dessert,
        categories,
        dessertCategoriesIds,
        error,
      });
    } else {
      res
        .status(404)
        .render("error", { status: "404", error: "Dessert not found" });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .render("error", { status: "500", error: "Internal server error" });
  }
};

exports.postController = async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;
  const correctPassword = process.env.password;
  const passErr = "Incorrect password";
  const { name, price, description, imageurl, categories } = req.body;
  if (password !== correctPassword) {
    res.redirect(`/edit/${id}?error=${passErr}`);
  } else {
    try {
      const dessert = await db.updateDessertById(
        id,
        name,
        price,
        description,
        imageurl
      );
      await db.deleteDessertCategoryById(id);
      if (categories && categories.length > 0) {
        for (const category of categories) {
          await db.postNewRelation(id, parseInt(category));
        }
      }
      res.redirect(`/dessert/${id}`);
    } catch (error) {
      res
        .status(500)
        .render("error", { status: "500", error: "Internal server error" });
    }
  }
};
