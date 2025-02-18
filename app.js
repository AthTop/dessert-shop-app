const express = require("express");
require("dotenv").config();
const indexRoute = require("./routes/indexRoute");
const categoryRoute = require("./routes/categoryRoute");

const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

//Routes
app.use("/", indexRoute);
app.use("/category", categoryRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Express server running on port ${PORT}`);
});
