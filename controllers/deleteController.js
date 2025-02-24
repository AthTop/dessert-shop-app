const db = require("../db/queries");
require("dotenv").config();

exports.getController = async (req, res) => {
  const { id } = req.params;
  res.render("confirm", { title: "Confirm", id });
};

exports.postController = async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;
  const correctPassword = process.env.password;
  const passErr = "Incorrect password";

  if (password !== correctPassword) {
    res.render("confirm", { title: "Confirm", id, error: passErr });
  } else {
    try {
      const result = await db.getDessertById(id);
      const dessert = result[0];
      if (result.length === 0) {
        res.status(404).render("error", {
          status: 404,
          error: "Dessert not found",
        });
      }
      if (dessert) {
        await db.deleteDessertById(id);
        res.render("success", { title: "Success" });
      }
    } catch (error) {
      res.status(500).render("error", {
        status: 500,
        error: "Internal server error",
      });
    }
  }
};
