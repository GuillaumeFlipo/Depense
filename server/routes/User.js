const express = require("express");
const router = express.Router();

const authCtrl = require("./../controllers/Auth");
const userCtrl = require("./../controllers/User");

// Auth
router.post("/register", authCtrl.signUp);
router.post("/login", authCtrl.signIn);
router.get("/logout", authCtrl.logout);

// User db
router.get("/", userCtrl.getAllUsers);
router.get("/:id", userCtrl.userInfo);
router.put("/:id", userCtrl.updateUser);
router.delete("/:id", userCtrl.deleteUser);

module.exports = router;
