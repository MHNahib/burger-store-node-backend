const express = require("express");
const asyncError = require("express-async-errors");
const dotenv = require("dotenv");
dotenv.config();
const db = require("./config/db");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// middleware
app.use(express.json());

app.use("/", require("./routes/home"));
app.use("/api/v1", require("./routes/index"));

app.use(errorHandler);

const port = process.env.APP_PORT;

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
