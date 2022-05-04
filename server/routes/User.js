const express = require("express");
const router = express.Router();

const authCtrl = require("./../controllers/Auth");
const userCtrl = require("./../controllers/User");

const auth = require("../middleware/Auths");

// Auth
router.post("/register", authCtrl.signUp);
router.post("/auth/check/:id", auth.requireAuth, authCtrl.checkMotdepasse);
router.post("/login", authCtrl.signIn);
router.put("/auth/update/:id", auth.requireAuth, authCtrl.updatePassword);
router.get("/logout", authCtrl.logout);

// User db
router.get("/all/:bool", auth.requireAuth, userCtrl.getAllUsers);
router.get("/:id", auth.requireAuth, userCtrl.userInfo);
router.put("/:id", auth.requireAuth, userCtrl.updateUser);
router.delete("/:id", auth.requireAuth, userCtrl.deleteUser);

module.exports = router;
