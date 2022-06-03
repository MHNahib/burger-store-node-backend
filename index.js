const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const app = express();

app.use("/", require("./routes/home"));

const port = process.env.APP_PORT;

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
