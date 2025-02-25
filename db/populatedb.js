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
    dessert_id INTEGER REFERENCES dessert(id) ON DELETE CASCADE,
    category_id INTEGER REFERENCES category(id),
    CONSTRAINT pk_dessert_category PRIMARY KEY(dessert_id, category_id)
);

INSERT INTO dessert(name, description, price, image_url) VALUES 
('Chocolate Cake', 'Delicious chocolate cake', 5.5, 'https://www.piesandtacos.com/wp-content/uploads/2024/04/chocolate-birthday-cake-scaled.jpg'), 
('Chocolate Ice Cream', 'Fluffy cold chocolate ice cream', 2.10, 'https://www.cravethegood.com/wp-content/uploads/2021/04/sous-vide-chocolate-ice-cream-15-1366x2048.jpg'), 
('Apple Candy', 'Glistening crunchy and sweet candy apple', 1.30, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFjXfggn18J6vKRNUAC90rwfdDpr4DAJGDiw&s');

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
  console.log(process.env.DATABASE_URL)
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("Done!'");
};

main();
