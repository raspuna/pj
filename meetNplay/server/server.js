require("dotenv").config();
const mysql = require("mysql");
const cookieParser = require("cookie-parser");

const express = require("express");
const cors = require("cors");
const pool = require("./config/mysql");
const PORT = 8000;

const app = express();
app.use(cookieParser());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(function (req, res, next) {
  req.pool = pool;
  next();
});
require("./routes/user.routes")(app);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
