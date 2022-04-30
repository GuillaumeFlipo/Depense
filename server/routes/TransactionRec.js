const express = require("express");
const router = express.Router();
const transactionRecCtrl = require("../controllers/TransactionRec");
// const multer = require("multer");
// const upload = multer();

router.get("/", transactionRecCtrl.readItems);
router.get("/:id", transactionRecCtrl.readItem);
router.post("/", transactionRecCtrl.createItem);
router.put("/:id", transactionRecCtrl.updateItem);
router.delete("/:id", transactionRecCtrl.deleteItem);

module.exports = router;
