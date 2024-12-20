const express = require("express");
const router = express.Router();
const { protect, adminOnly } = require("../middleware/authMiddleware");
const {
  createCoupon,
  getAllCoupons,
  getCoupon,
  deleteCoupon,
} = require("../controllers/couponController");

// routes
router.post("/new", protect, adminOnly, createCoupon);
router.get("/", protect, adminOnly, getAllCoupons);
router.get("/:couponName", protect, getCoupon);
router.delete("/:id", protect, adminOnly, deleteCoupon);

module.exports = router;
