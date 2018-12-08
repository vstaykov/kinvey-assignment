const express = require("express");
const bodyParser = require("body-parser");

const InvalidDataError = require("./errors/InvalidDataError");
const database = require("./database");
const productsRoute = require("./product/product.route");
const ordersRout = require("./order/order.route");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/products", productsRoute);
app.use("/orders", ordersRout);

app.use((req, res) => {
  res.status(404).send("Not found");
});

app.use((err, req, res) => {
  const status = err instanceof InvalidDataError ? 400 : 500;

  res.status(status).send(err.message);
});

(async function() {
  const dbConnected = await database.connect();

  if (dbConnected) {
    app.listen(3000, err => console.log(err));
  }
})();
