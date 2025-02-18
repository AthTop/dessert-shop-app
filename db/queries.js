const pool = require("./pool.js");

const getAllDesserts = async () => {
  const { rows } = await pool.query("SELECT * FROM dessert");
  return rows;
};

const getAllCategories = async () => {
  const { rows } = await pool.query("SELECT * FROM category");
  return rows;
};

const getCategoryById = async (id) => {
  const { rows } = await pool.query("SELECT * FROM category WHERE id IN($1)", [
    id,
  ]);
  return rows;
};

// Handle querying uncategorized desserts since everything has it as default
const getUncategorizedDesserts = async () => {
  const { rows } = await pool.query(
    `SELECT * 
    FROM dessert 
    WHERE dessert.id IN (
      SELECT dessert_id
      FROM dessert_category
      WHERE category_id = 1
    )
    AND dessert.id NOT IN (
      SELECT dessert_id
      FROM dessert_category
      WHERE category_id <> 1
    );`
  );
  return rows;
};

// Handle getting desserts that aren't uncategorized 
const getDessertsByCategory = async (catId) => {
  const { rows } = await pool.query(
    `SELECT * 
    FROM dessert
    JOIN dessert_category ON dessert.id = dessert_category.dessert_id
    WHERE dessert_category.category_id = $1;`,
    [catId]
  );
  return rows;
};

module.exports = {
  getAllDesserts,
  getAllCategories,
  getCategoryById,
  getDessertsByCategory,
  getUncategorizedDesserts
};
