const express = require("express");
const bcrpt = require("bcrypt");
const dontenv = require("dotenv");
dontenv.config();
const jwt = require("jsonwebtoken");
const router = require("./router");

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
};

app.use(allowCrossDomain);

app.use("/", router);

// app.post("/api", (req, res) => {
//   res.status(200);
//   //check db for username and password
//   const user = req.body;
//   const email = req.body.email;
//   const password = req.body.password;

//   bcrpt.genSalt(10, (err, salt) => {
//     bcrpt.hash(password, salt, (err, hash) => {});
//   });

//   // jwt.sign({ user: req.body }, "secretkey", (err, token) => {
//   //   res.json({ token: token });
//   // });
// });

// app.post("/api/timeline", verifyToken, (req, res) => {
//   jwt.verify(req.token, "secretkey", (err, authData) => {
//     if (err) {
//       res.sendStatus(403);
//     } else {
//       res.json({
//         message: "Welcome to the timeline",
//         authdata: authData,
//       });
//     }
//   });
// });

// function verifyToken(req, res, next) {
//   const bearerHeader = req.headers["authorization"];
//   if (typeof bearerHeader !== "undefined") {
//     const bearer = bearerHeader.split(" ");
//     const bearerToken = bearer[1];
//     req.token = bearerToken;
//     next();
//   } else {
//     res.sendStatus(403);
//   }
// }
const port = 2500;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
