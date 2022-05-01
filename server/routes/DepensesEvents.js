const express = require("express");
const router = express.Router();
const DepensesEventCrtl = require("../controllers/DepensesEvents");
// const multer = require("multer");
// const upload = multer();

router.get("/", DepensesEventCrtl.readItems);
router.get("/:id", DepensesEventCrtl.readItemId);
router.post("/", DepensesEventCrtl.createItem);
router.put("/:id", DepensesEventCrtl.updateItem);
router.delete("/:id", DepensesEventCrtl.deleteItem);

module.exports = router;
