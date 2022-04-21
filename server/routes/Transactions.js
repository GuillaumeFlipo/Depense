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

// upload

// router.transaction(
//   "/upload/img/edit",
//   upload.single("file"),
//   transactionCtrl.uploadPicture
// );
// router.transaction(
//   "/upload/img/add",
//   upload.single("file"),
//   transactionCtrl.uploadPictureAdd
// );
// router.transaction(
//   "/upload/pdf/edit",
//   upload.single("file"),
//   transactionCtrl.uploadPdf
// );
// router.transaction(
//   "/upload/pdf/add",
//   upload.single("file"),
//   transactionCtrl.uploadPdfAdd
// );

module.exports = router;
