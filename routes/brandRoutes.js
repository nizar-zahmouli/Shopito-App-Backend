const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require("../middleware/authMiddleware");
const { createBrand, getBrands, deleteBrand } = require("../controllers/brandController");

router.post("/new", protect, adminOnly, createBrand);
router.get("/", protect, adminOnly , getBrands);
router.delete("/:slug", protect, adminOnly , deleteBrand);


module.exports = router;