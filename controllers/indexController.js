const db = require("../db/queries.js");

exports.getController = async (req, res) => {
  const desserts = await db.getAllDesserts();
  const categories = await db.getAllCategories();
  res.render("index", { title: "Main", desserts, categories});
};
