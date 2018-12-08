const express = require("express");

const productsController = require("./product.controller");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const { query } = req;
    let products = [];

    if (query) {
      products = await productsController.getProducts(query);
    } else {
      products = await productsController.getAllProducts();
    }

    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await productsController.getProduct(id);

    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json(`Product with ID ${id} does not exist`);
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
