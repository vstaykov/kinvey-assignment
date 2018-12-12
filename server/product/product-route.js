const express = require("express");

const productsController = require("./product-controller");

const MAX_LIMIT = 100;
const DEFAULT_OFFSET = 0;
const router = express.Router();

const createProductsFilterFromQuery = query => {
  const filter = query ? { ...query } : {};

  const offset = parseInt(query.offset, 10) || DEFAULT_OFFSET;
  filter.offset = offset >= 0 ? offset : DEFAULT_OFFSET;

  const limit = parseInt(query.limit, 10);
  filter.limit = limit > 0 && limit < MAX_LIMIT ? limit : MAX_LIMIT;

  filter.keywords = query.keywords && query.keywords.split(",");

  return filter;
};

router.get("/", async (req, res, next) => {
  try {
    const filter = createProductsFilterFromQuery(req.query);

    const products = await productsController.getProducts(filter);

    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
});

router.get("/categories", async (req, res, next) => {
  try {
    const categories = await productsController.getProductsCategories();

    res.status(200).json(categories);
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
