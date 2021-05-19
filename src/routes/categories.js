const express = require("express");
const router = express.Router();
const CategoryService = require("../services/categories");

const service = new CategoryService();

router.get("/", async (req, res, next) => {
  try {
    const categories = await service.getCategories();

    res.status(200).json({
      data: categories,
      message: "categories listed",
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:categoryId", async (req, res, next) => {
  const { categoryId } = req.params;

  try {
    const category = await service.getCategory({ categoryId });

    res.status(200).json({
      data: category,
      message: "category listed",
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:categoryId/products", async (req, res, next) => {
  const { categoryId } = req.params;

  try {
    const categoryProducts = await service.categoryProducts({ categoryId });
    return categoryProducts;
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  const { body: category } = req;

  try {
    const newCategory = await service.createCategory({ category });

    res.status(201).json({
      data: newCategory,
      message: "category created",
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:categoryId", async (req, res, next) => {
  const { categoryId } = req.params;
  const { body: category } = req;

  try {
    const updatedCategory = await service.updateProduct({
      categoryId,
      category,
    });

    res.status(201).json({
      data: updatedCategory,
      message: "categories updated",
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:categoryId", async (req, res, next) => {
  const { categoryId } = req.params;

  try {
    const category = await service.deleteProduct({ categoryId });

    res.status(200).json({
      data: category,
      message: "category deleted",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
