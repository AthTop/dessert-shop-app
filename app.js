const express = require("express");
require("dotenv").config();
const indexRoute = require("./routes/indexRoute");
const categoryRoute = require("./routes/categoryRoute");
const addRoute = require("./routes/addRouter");
const dessertRoute = require("./routes/dessertRoute");

const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Routes
app.use("/", indexRoute);
app.use("/category", categoryRoute);
app.use("/add", addRoute);
app.use("/dessert", dessertRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Express server running on port ${PORT}`);
});
