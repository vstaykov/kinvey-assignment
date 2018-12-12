const express = require("express");
const bodyParser = require("body-parser");

const InvalidDataError = require("./../../errors/InvalidDataError");
const apiLogging = require("./api-logging");
const productsRoute = require("./../../product/product-route");
const ordersRout = require("./../../order/order-route");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/products", productsRoute);
app.use("/orders", ordersRout);

app.use((req, res, next) => {
  res.status(404).json("Not found");

  next();
});

app.use((err, req, res, next) => {
  const status = err instanceof InvalidDataError ? 400 : 500;

  res.status(status).json(err.message);
  res.err = err;

  next();
});

app.use(apiLogging.fileLogger);

module.exports = app;
