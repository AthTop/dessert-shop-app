const pool = require("./pool.js");

const getAllDesserts = async () => {
  const { rows } = await pool.query("SELECT * FROM desert");
  return rows;
};

const getAllCategories = async () => {
  const { rows } = await pool.query("SELECT * FROM category");
  return rows;
};

module.exports = { getAllDesserts, getAllCategories };
