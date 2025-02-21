const db = require("../db/queries");

exports.getController = async (req, res) => {
  const categories = await db.getAllCategories();
  res.render("add", { title: "New Dessert", categories });
};

exports.postController = async (req, res) => {
  try {
    const name = req.body.name;
    const price = req.body.price;
    const description = req.body.description || null;
    const image_url = req.body.imageurl || null;
    const result = await db.postDessert(name, price, description, image_url);
    const dessertId = result[0].id;
    const categories = req.body.categories;
    if (categories && categories.length > 0) {
      for (const category of categories) {
        await db.postNewRelation(dessertId, parseInt(category));
      }
    }
    res.redirect("/");
  } catch(error) {
    console.log(error);
  }
};
