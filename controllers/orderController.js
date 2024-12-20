const asyncHandler = require("express-async-handler");
const Order = require("../models/orderModel");
// const { calculateTotalPrice } = require("../utils");
const Product = require("../models/productModel");
// const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
const axios = require("axios");
const User = require("../models/userModel");
// const Transaction = require("../models/transactionModel");
// const { orderSuccessEmail } = require("../emailTemplates/orderTemplate");
// const sendEmail = require("../utils/sendEmail");

// Create a new order
const createOrder = asyncHandler(async (req, res) => {
  const {
    orderDate,
    orderTime,
    orderAmount,
    orderStatus,
    cartItems,
    shippingAddress,
    paymentMethod,
    coupon,
  } = req.body;
  //  validatation
  if (!cartItems || !orderStatus || !shippingAddress || !paymentMethod) {
    res.status(400);
    throw new Error("Order data missing !!!");
  }

  //  create order
  await Order.create({
    user: req.user._id,
    orderDate,
    orderTime,
    orderAmount,
    orderStatus,
    cartItems,
    shippingAddress,
    paymentMethod,
    coupon,
  });

  res.status(201).json({ message: "Order created successfully" });
});

// Get all Orders
const getOrders = asyncHandler(async (req, res) => {
  let orders;

  if (req.user.role === "admin") {
    orders = await Order.find().sort("-createdAt");
    return res.status(200).json(orders);
  }
  orders = await Order.find({ user: req.user._id }).sort("-createdAt");
  res.status(200).json(orders);
});

// Get single Order
const getOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }
  if (req.user.role === "admin") {
    return res.status(200).json(order);
  }

  // Match order to user
  if (order.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("User not authorized");
  }
  return res.status(200).json(order);
});

// Update order status
const updateOrderStatus = asyncHandler(async (req, res) => {
  const { orderStatus } = req.body;
  const { id } = req.params;

  const order = await Order.findById(id);
  
  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  //  Update the order status 
  await Order.findByIdAndUpdate(
    { _id: id },
    {
      orderStatus
    },
    {
      new: true,
      runValidators: true,
    }
  );

    return res.status(200).json({message:  "Order status updated"});




});

// Pay with stripe
const payWithStripe = asyncHandler(async (req, res) => {});

// Create a PaymentIntent with the order amount and currency

//const paymentIntent = await stripe.paymentIntents.create({

//});

// Verify FLW Payment
const verifyFlwPayment = asyncHandler(async (req, res) => {});

// Pay With Flutterwave // NOT WORKING
const payWithFlutterwave = async (req, res) => {};

// Pay with Wallet
const payWithWallet = asyncHandler(async (req, res) => {});

/*const updateProductQuantity = async () => {
  // Update Product quantity
};*/

module.exports = {
  createOrder,
  getOrders,
  getOrder,
  updateOrderStatus,
  //   payWithStripe,
  //   verifyFlwPayment,
  //   payWithFlutterwave,
  //   payWithWallet,
};
