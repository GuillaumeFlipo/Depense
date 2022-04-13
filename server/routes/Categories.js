const express = require("express");
const router = express.Router();
const categoriesCtrl = require("../controllers/Categories");
// const multer = require("multer");
// const upload = multer();

router.get("/", categoriesCtrl.readCategories);
router.get("/:id", categoriesCtrl.readOneTransaction);
router.post("/", categoriesCtrl.createTransaction);
router.put("/:id", categoriesCtrl.updateTransaction);
router.delete("/:id", categoriesCtrl.deleteTransaction);

module.exports = router;
