const express = require("express");
const router = express.Router();

const {
  createProduct,
  getAllProducts,
  deleteProduct,
  getProduct,
  updateProduct,
  // reviewProduct,
  // deleteReview,
  // updateReview,
} = require("../controllers/productController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

router.post("/new", protect, adminOnly, createProduct);
router.get("/", getAllProducts);
router.delete("/:id", protect, adminOnly, deleteProduct);
router.get("/:id", getProduct);
router.patch("/:id", protect, adminOnly, updateProduct);

// router.patch("/review/:id", protect, reviewProduct);
// router.patch("/deleteReview/:id", protect, deleteReview);
// router.patch("/updateReview/:id", protect, updateReview);

module.exports = router;
