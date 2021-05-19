const express = require("express");
const router = express.Router();
const ProductService = require("../services/products");

const service = new ProductService();

router.get("/", async (req, res, next) => {

  try {
    const products = await service.getProducts();

    res.status(200).json({
      data: products,
      message: "products listed",
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:productId", async (req, res, next) => {
  const { productId } = req.params;

  try {
    const product = await service.getProduct({ productId });

    res.status(200).json({
      data: product,
      message: "product listed",
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  const { body: product } = req;

  try {
    const newProduct = await service.createProduct({ product });

    res.status(201).json({
      data: newProduct,
      message: "product created",
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:productId", async (req, res, next) => {
  const { productId } = req.params;
  const { body: product } = req;

  try {
    const updatedProduct = await service.updateProduct({ productId, product });

    res.status(201).json({
      data: updatedProduct,
      message: "products updated",
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:productId", async (req, res, next) => {
  const { productId } = req.params;

  try {
    const product = await service.deleteProduct({ productId });

    res.status(200).json({
      data: product,
      message: "product deleted",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
