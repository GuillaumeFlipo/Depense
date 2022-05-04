const express = require("express");
const router = express.Router();
const transactionRecCtrl = require("../controllers/TransactionRec");
// const multer = require("multer");
// const upload = multer();
const auth = require("../middleware/Auths");

router.get("/", auth.requireAuth, transactionRecCtrl.readItems);
router.get("/:id", auth.requireAuth, transactionRecCtrl.readItem);
router.post("/", auth.requireAuth, transactionRecCtrl.createItem);
router.put("/:id", auth.requireAuth, transactionRecCtrl.updateItem);
router.delete("/:id", auth.requireAuth, transactionRecCtrl.deleteItem);

module.exports = router;
