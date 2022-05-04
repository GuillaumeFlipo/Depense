const express = require("express");
const router = express.Router();
const transactionCtrl = require("../controllers/Transactions");
// const multer = require("multer");
// const upload = multer();
const auth = require("../middleware/Auths");

router.get("/", auth.requireAuth, transactionCtrl.readTransaction);
router.get("/:id", auth.requireAuth, transactionCtrl.readTransactionsId);
router.get(
  "/depensesEvent/:id",
  auth.requireAuth,
  transactionCtrl.readTransactionsEvent
);
router.post("/", auth.requireAuth, transactionCtrl.createTransaction);
router.put("/:id", auth.requireAuth, transactionCtrl.updateTransaction);
router.delete("/:id", auth.requireAuth, transactionCtrl.deleteTransaction);

module.exports = router;
