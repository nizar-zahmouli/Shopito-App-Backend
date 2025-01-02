const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

// Register User
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, photo } = req.body;

  // validation
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill in all required fields");
  }
  if (password.length < 6) {
    res.status(400);
    throw new Error("Password must be at least 6 characters");
  }
  // chek if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("Email has already been registered");
  }

  // Create  new user

  const user = new User(req.body);

  //

  await user.save();
  // Generate Token
  const token = generateToken(user._id);

  if (user) {
    const { _id, name, email, role, photo } = user;
    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400),
      secure: true,
      sameSite : none ,
    });

    // Send user data
    res.status(201).json({
      _id,
      name,
      email,
      role,
      token,
      photo,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }

  res.send("Register User...");
});

// Login User

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // validate request
  if (!email || !password) {
    res.status(400);
    throw new Error("Please add eamil and password");
  }
  //  check if user exists

  const user = await User.findOne({ email });
  if (!user) {
    res.status(400);
    throw new Error("user does not exist");
  }

  //  User exists, check if password is correct
  const passwordIsCorrect = await bcrypt.compare(password, user.password);

  // generate token

  const token = generateToken(user._id);
  if (user && passwordIsCorrect) {
    const newUser = await User.findOne({ email }).select("-password");
    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400),
      secure: true,
      sameSite : none ,
    });
    // Send user data
    res.status(201).json(newUser);
  } else {
    res.status(400);
    throw new Error("invalid email or password");
  }
});
//  logout user

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("token", "", {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400),
    secure: true,
    sameSite : none ,
  });
  res.status(200).json({ message: "successfully logged out" });
});
//  Get User
const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(401);
    throw new Error("User not found");
  }
});

//  Get Login Status
const getLoginStatus = asyncHandler(async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json(false);
  }
  // verify token
  const verified = jwt.verify(token, process.env.JWT_SECRET);
  if (verified) {
    res.json(true);
  } else {
    res.json(false);
  }
});

// Update User
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    const { name, email, phone, address } = user;
    user.name = req.body.name || name;
    user.phone = req.body.phone || phone;
    user.address = req.body.address || address;

    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      phone: updatedUser.phone,
      photo: updatedUser.photo,
      address: updatedUser.address,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// Update Photo
const updatePhoto = asyncHandler(async (req, res) => {
  const { photo } = req.body;
  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  user.photo = photo;
  const updatedUser = await user.save();
  res.status(200).json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    phone: updatedUser.phone,
    photo: updatedUser.photo,
    address: updatedUser.address,
  });
});

// save Cart
const saveCart = asyncHandler(async (req, res) => {
  const { cartItems } = req.body;

  const user = await User.findById(req.user._id);

  if (user) {
    user.cartItems = cartItems;
    user.save();
    res.status(200).json({ message: "cart saved" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// get Cart
const getCart = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.status(200).json(user.cartItems);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  getLoginStatus,
  updateUser,
  updatePhoto,
  saveCart,
  getCart,
};
