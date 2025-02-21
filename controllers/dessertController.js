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
    console.log(error);
  }
};

exports.deleteController = async (req, res) => {
  const { id } = req.params;
  console.log(id);
};
