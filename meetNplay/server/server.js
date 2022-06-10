require("dotenv").config();
const cookieParser = require("cookie-parser");

const express = require("express");
const cors = require("cors");
const PORT = 8000;

const app = express();
app.use(cookieParser());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require("./routes/user.routes")(app);
require("./routes/friend.routes")(app);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
