const express = require("express");
const router = express.Router();
const categoriesCtrl = require("../controllers/Categories");
// const multer = require("multer");
// const upload = multer();

const auth = require("../middleware/Auths");

router.get("/", auth.requireAuth, categoriesCtrl.readCategories);
router.get("/:id", auth.requireAuth, categoriesCtrl.readOneTransaction);
router.post("/", auth.requireAuth, categoriesCtrl.createTransaction);
router.put("/:id", auth.requireAuth, categoriesCtrl.updateTransaction);
router.delete("/:id", auth.requireAuth, categoriesCtrl.deleteTransaction);

module.exports = router;
