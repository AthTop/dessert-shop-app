const express = require("express");
require("dotenv").config();
const indexRoute = require("./routes/indexRoute");
const categoryRoute = require("./routes/categoryRoute");
const addRoute = require("./routes/addRouter");
const dessertRoute = require("./routes/dessertRoute");
const errorRoute = require("./routes/errorRoute");
const deleteRoute = require("./routes/deleteRouter");
const editRoute = require("./routes/editRoute");

const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//Routes
app.use("/category", categoryRoute);
app.use("/add", addRoute);
app.use("/dessert", dessertRoute);
app.use("/error", errorRoute);
app.use("/delete", deleteRoute);
app.use("/edit", editRoute);
app.use("/", indexRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Express server running on port ${PORT}`);
});
