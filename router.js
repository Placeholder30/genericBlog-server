const express = require("express");
const router = express.Router();
const userController = require("./controllers/usercontroller");

router.get("/api");

router.post("/api/register", userController.register);
router.post("/api/login");
router.get("/api/logout");

module.exports = router;
