const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const userController = require("./controllers/userController");

router.get("/api");

router.post("/api/register", userController.register);
router.post("/api/login", userController.login);
router.get("/api/createpost", userController.createpost);
router.get("/api/logout");

module.exports = router;
