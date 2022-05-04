const express = require("express");
const router = express.Router();
const DepensesEventCrtl = require("../controllers/DepensesEvents");
// const multer = require("multer");
// const upload = multer();

const auth = require("../middleware/Auths");

router.get("/", auth.requireAuth, DepensesEventCrtl.readItems);
router.get("/:id", auth.requireAuth, DepensesEventCrtl.readItemId);
router.post("/", auth.requireAuth, DepensesEventCrtl.createItem);
router.put("/:id", auth.requireAuth, DepensesEventCrtl.updateItem);
router.delete("/:id", auth.requireAuth, DepensesEventCrtl.deleteItem);

module.exports = router;
