require("dotenv").config();
const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS dessert (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR ( 255 ) NOT NULL,
    description TEXT,
    price DECIMAL(5, 2) NOT NULL,
    image_url VARCHAR( 255 )
);

CREATE TABLE IF NOT EXISTS category (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR ( 255 ) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS dessert_category (
    dessert_id INTEGER REFERENCES dessert(id),
    category_id INTEGER REFERENCES category(id),
    CONSTRAINT pk_dessert_category PRIMARY KEY(dessert_id, category_id)
);

INSERT INTO dessert(name, description, price) VALUES 
('Chocolate Cake', 'Delicious chocolate cake', 5.5), 
('Chocolate Ice Cream', 'Fluffy cold chocolate ice cream', 2.10), 
('Apple Candy', 'Glistening crunchy and sweet candy apple', 1.30);

INSERT INTO category(name) VALUES 
('Uncategorized'), 
('Cake'), 
('Ice Cream');

INSERT INTO dessert_category(dessert_id, category_id) VALUES
    (1,1),
    (1,2),
    (2,1),
    (2,3),
    (3,1);
`;

const drop = `DROP TABLE dessert_category, dessert, category;`;

const main = async () => {
  console.log("Creating and populating db...");
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("Done!'");
};

main();
