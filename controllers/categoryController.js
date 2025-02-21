const db = require("../db/queries");

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
      res.render('category', { title: category.id , desserts })
    }
  } catch {}
};
