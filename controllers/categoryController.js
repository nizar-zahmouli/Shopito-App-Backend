const asyncHandler = require("express-async-handler");
const Category = require("../models/categoryModel");
const slugify = require("slugify");

// Create new category
const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400);
    throw new Error("Please fill in category name");
  }
  const categoryExists = await Category.findOne({ name });
  if (categoryExists) {
    res.status(400);
    throw new Error("Category name already exists");
  }

  const category = await Category.create({
    name,
    slug: slugify(name),
  });
  res.status(201).json(category);
});

//  Get Category
const getCategory = asyncHandler(async (req, res) => {
  const categories = await Category.find().sort("-createdAt");
  res.status(200).json(categories);
});

// Delete Category

const deleteCategory = asyncHandler(async (req, res) => {
  const slug = req.params.slug.toLocaleLowerCase();
  const categories = await Category.findOneAndDelete({ slug });
  if (!categories) {
    res.status(404);
    throw new Error("category not found");
  }
  res.status(200).json({ message: "Category deleted successfully" });
});

module.exports = {
  createCategory,
  getCategory,
  deleteCategory,
};
