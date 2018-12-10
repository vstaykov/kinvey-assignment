const http = require("http");

const app = require("./api");
const database = require("./../../utils/database");
const ordersMonitoring = require("./../../utils/orders-monitoring");
const config = require("./../../config/api-config");
const logging = require("./../../utils/logging");

const { port } = config;
const server = http.createServer(app);

const safeExit = () => {
  server.close(() =>
    logging.logInfo(
      `Server stopped listening on port ${port} on app termination`
    )
  );
};

const run = async () => {
  const dbConnected = await database.connect();

  if (dbConnected) {
    server.listen(port, err => {
      if (err) {
        logging.logError(err);
      } else {
        logging.logInfo(`Server started listening on port ${port}`);
      }
    });

    ordersMonitoring.monitorOrders();
  }
};

process.on("SIGINT", safeExit);
process.on("SIGTERM", safeExit);

run();
