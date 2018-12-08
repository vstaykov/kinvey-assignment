const express = require("express");

const ordersController = require("./order.controller");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const { query } = req;
    let orders = [];

    if (query) {
      orders = await ordersController.getOrders(query);
    } else {
      orders = await ordersController.getAllOrders();
    }

    res.status(200).json(orders);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await ordersController.getOrder(id);

    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404).send(`Order with ID ${id} does not exist`);
    }
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { body } = req;
    const order = await ordersController.createOrder(body);

    res.status(200).send(order);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
