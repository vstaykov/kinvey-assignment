const express = require("express");

const ordersController = require("./order-controller");

const router = express.Router();

router.get("/:id/status", async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await ordersController.getOrderStatus(id);

    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404).json(`Order with ID ${id} does not exist`);
    }
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { body } = req;
    const order = await ordersController.createOrder(body);

    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
