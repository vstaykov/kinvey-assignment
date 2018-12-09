const http = require("http");

const database = require("./../../database");
const ordersMonitoring = require("./../../utils/orders-monitoring");
const app = require("./api");
const config = require("./../../config/api-config");

const server = http.createServer(app);
const { port } = config;

const safeExit = () => {
  server.close(() =>
    console.log(`Server stopped listening on port ${port} on app termination`)
  );
};

const run = async () => {
  const dbConnected = await database.connect();

  if (dbConnected) {
    server.listen(port, err => {
      const message = err || `Server started listening on port ${port}`;
      console.log(message);
    });

    ordersMonitoring.monitorOrders();
  }
};

process.on("SIGINT", safeExit);
process.on("SIGTERM", safeExit);

run();
