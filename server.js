const express = require("express");
const dontenv = require("dotenv");
dontenv.config();
const jwt = require("jsonwebtoken");
const cors = require("cors");
const router = require("./router");

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use("/", router);

const port = 3900;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
