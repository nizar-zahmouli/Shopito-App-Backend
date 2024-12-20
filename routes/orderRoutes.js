const express = require("express");
const router = express.Router();
const { protect, adminOnly } = require("../middleware/authMiddleware");
const {
  createOrder,
  getOrders,
  getOrder,
  updateOrderStatus,
  //   payWithStripe,
  //   payWithFlutterwave,
  //   verifyFlwPayment,
  //   payWithWallet,
} = require("../controllers/orderController");

// router.get("/response", verifyFlwPayment);
router.post("/new", protect, createOrder);
router.get("/", protect, getOrders);
router.get("/:id", protect, getOrder);
router.patch("/:id", protect, adminOnly, updateOrderStatus);

//
// router.post("/create-payment-intent", payWithStripe);
// router.post("/payWithFlutterwave", payWithFlutterwave);
// router.post("/payWithWallet", protect, payWithWallet);
//
module.exports = router;
