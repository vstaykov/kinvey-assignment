const database = require("./../../database");
const ordersMonitoring = require("./../../utils/orders-monitoring");
const app = require("./api");
const config = require("./../../../config/api-config");

const { port } = config;

const run = async () => {
  const dbConnected = await database.connect();

  if (dbConnected) {
    app.listen(port, err => console.log(err));

    ordersMonitoring.monitorOrders();
  }
};

run();
