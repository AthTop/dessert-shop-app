const db = require("../db/queries");

exports.getController = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await db.getDessertById(id);
    const dessert = result[0];
    if (dessert) {
      res.render("dessert", {
        title: dessert.name,
        desserts: [dessert],
        single: true,
      });
    }
  } catch (error) {
    res.status(500).render("error", {
      status: 500,
      error: "Internal server error",
    });
  }
};
