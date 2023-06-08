const express = require("express");
const userController = require("../controllers/users.controller");
const { requireSignIn, isAdmin } = require("../middleware/auth.middleware");
const router = express.Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/auth-check", requireSignIn, userController.authCheck);
router.get("/admin-check", requireSignIn, isAdmin, userController.adminCheck);

// checking
router.get("/secret", requireSignIn, isAdmin, userController.getSecret);
router.put("/profile", requireSignIn, userController.Updateprofile);

module.exports = router;
