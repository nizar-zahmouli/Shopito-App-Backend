const express = require("express");
const router = express.Router();
const { createCategory, getCategory, deleteCategory } = require("../controllers/categoryController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

router.post("/new", protect, adminOnly, createCategory);
router.get("/", protect, adminOnly , getCategory);
router.delete("/:slug", protect, adminOnly , deleteCategory);


module.exports = router;
 