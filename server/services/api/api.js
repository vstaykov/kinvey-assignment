const express = require("express");
const bodyParser = require("body-parser");

const InvalidDataError = require("./../../errors/InvalidDataError");
const productsRoute = require("./../../product/product-route");
const ordersRout = require("./../../order/order-route");
const logging = require("./logging");

const app = express();
const v1Router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

v1Router.use("/products", productsRoute);
v1Router.use("/orders", ordersRout);

app.use("/api/v1", v1Router);

app.use((req, res, next) => {
  res.status(404).send("Not found");

  next();
});

app.use((err, req, res, next) => {
  const status = err instanceof InvalidDataError ? 400 : 500;

  res.status(status).send(err.message);
  res.err = err;

  next();
});

app.use(logging.fileLogger);

module.exports = app;
