const express = require("express");
const bodyParser = require("body-parser");

const InvalidDataError = require("./errors/InvalidDataError");
const database = require("./database");
const productsRoute = require("./product/product.route");
const ordersRout = require("./order/order.route");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const v1Router = express.Router();
v1Router.use("/products", productsRoute);
v1Router.use("/orders", ordersRout);

app.use("/api/v1", v1Router);

app.use((req, res) => {
  res.status(404).send("Not found");
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const status = err instanceof InvalidDataError ? 400 : 500;

  res.status(status).send(err.message);
});

(async function() {
  const dbConnected = await database.connect();

  if (dbConnected) {
    app.listen(3000, err => console.log(err));
  }
})();
