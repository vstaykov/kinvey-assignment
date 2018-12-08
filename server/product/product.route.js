const express = require("express");

const productsController = require("./product.controller");
const paramsValidator = require("./../utils/paramsValidator");

const router = express.Router();

router.get("/", async (req, res) => {
  const { query } = req;
  let products = [];

  if (query) {
    products = await productsController.getProducts(query);
  } else {
    products = await productsController.getAllProducts();
  }

  res.status(200).json(products);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  if (paramsValidator.checkIsValidId(id)) {
    const product = await productsController.getProduct(id);
    res.status(200).json(product);
  } else {
    res.status(400).send(`Invalid product ID: ${id}`);
  }
});

module.exports = router;
