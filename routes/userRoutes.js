const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  getLoginStatus,
  updateUser,
  updatePhoto,
  getCart,
  saveCart,
} = require("../controllers/userController");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/getUser", protect, getUser);
router.get("/getLoginStatus", getLoginStatus);

router.patch("/updateUser", protect, updateUser);
router.patch("/updatePhoto", protect, updatePhoto);

// Cart
router.get("/getCart", protect, getCart);
router.patch("/saveCart", protect, saveCart);

module.exports = router;
