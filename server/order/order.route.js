const express = require("express");

const ordersController = require("./order.controller");
const paramsValidator = require("./../utils/paramsValidator");

const router = express.Router();

router.get("/", async (req, res) => {
  const { query } = req;
  let orders = [];

  if (query) {
    orders = await ordersController.getOrders(query);
  } else {
    orders = await ordersController.getAllOrders();
  }

  res.status(200).json(orders);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  if (paramsValidator.checkIsValidId(id)) {
    const order = await ordersController.getOrder(id);

    res.status(200).json(order);
  } else {
    res.status(400).send(`Invalid order ID: ${id}`);
  }
});

router.post("/", async (req, res) => {
  const { body } = req;
  const order = await ordersController.createOrder(body);

  res.status(200).send(order);
});

module.exports = router;
