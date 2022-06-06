require("dotenv").config();
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/burger-store")
  .then(() => console.log(`connected`))
  .catch((err) => console.log(err));
