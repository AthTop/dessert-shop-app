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

//Add new dessert to DB and assign it default category of 1 for uncategorized
const postDessert = async (name, price, description, image_url) => {
  const { rows } = await pool.query(
    `
    WITH inserted_dessert AS (
        INSERT INTO dessert(name, price, description, image_url) 
        VALUES ($1, $2, $3, $4)
        RETURNING id
    )
    INSERT INTO dessert_category(dessert_id, category_id)
    SELECT id, 1 FROM inserted_dessert
    RETURNING dessert_id AS id;
    `,
    [name, price, description, image_url]
  );
  return rows;
};

const postNewRelation = async (dessert_id, category_id) => {
  await pool.query(
    `
    INSERT INTO dessert_category(dessert_id, category_id)
    VALUES ($1, $2)
    ON CONFLICT(dessert_id, category_id)
    DO NOTHING;
    `,
    [dessert_id, category_id]
  );
};

const getDessertById = async (id) => {
  const { rows } = await pool.query(
    `
    SELECT * FROM dessert
    WHERE id = $1
    `,
    [id]
  );
  return rows;
};

const deleteDessertById = async (id) => {
  await pool.query(
    `
    DELETE FROM dessert
    WHERE id = $1;
    `,
    [id]
  );
};

const getDessertCategories = async (id) => {
  const { rows } = await pool.query(
    `
    SELECT category_id FROM dessert_category
    WHERE dessert_id = $1
    `,
    [id]
  );
  return rows;
};

const updateDessertById = async (id, name, price, description, image_url) => {
  const { rows } = await pool.query(
    `
    UPDATE dessert
    SET name = $1,
        price = $2,
        description = $3,
        image_url = $4
    WHERE id = $5
    RETURNING *;
    `,
    [name, price, description, image_url, id]
  );
  return rows;
};

const deleteDessertCategoryById = async (id) => {
  await pool.query(
    `
    DELETE FROM dessert_category
    WHERE dessert_id = $1;
    `,
    [id]
  );
};

module.exports = {
  getAllDesserts,
  getAllCategories,
  getCategoryById,
  getDessertsByCategory,
  getUncategorizedDesserts,
  postDessert,
  postNewRelation,
  getDessertById,
  deleteDessertById,
  getDessertCategories,
  updateDessertById,
  deleteDessertCategoryById,
};
