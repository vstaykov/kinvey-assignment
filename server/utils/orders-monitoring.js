const Order = require("./../order/order.model");
const dbConfig = require("./../../config/dbconfig");
const redis = require("./redis-client");

const pipeline = [
  { $match: { "ns.db": `${dbConfig.dbName}`, "ns.coll": "orders" } }
];

const safeExit = () => redis.quit();

const monitorOrders = () => {
  Order.watch(pipeline).on("change", async data => {
    if (data.operationType === "insert") {
      const orderFulfillmentRequest = JSON.stringify(data.fullDocument);
      const res = await redis.rpushAsync(
        "ordersRequests",
        orderFulfillmentRequest
      );

      console.log(res);
    }
  });
};

process.on("SIGINT", safeExit);
process.on("SIGTERM", safeExit);

module.exports = { monitorOrders };
