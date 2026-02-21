const express = require("express");
const router = express.Router();
const adminController = require("../controllers/auth-controller");

router.post("/register", adminController.createAdmin); // once
router.post("/login", adminController.loginAdmin);

module.exports = router;
