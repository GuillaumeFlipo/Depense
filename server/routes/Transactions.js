const express = require("express");
const router = express.Router();
const transactionCtrl = require("../controllers/Transactions");
// const multer = require("multer");
// const upload = multer();

router.get("/", transactionCtrl.readTransaction);
router.get("/:id", transactionCtrl.readTransactionsId);
router.post("/", transactionCtrl.createTransaction);
router.put("/:id", transactionCtrl.updateTransaction);
router.delete("/:id", transactionCtrl.deleteTransaction);

module.exports = router;
