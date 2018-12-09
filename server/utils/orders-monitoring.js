const Order = require("./../order/order-model");
const dbConfig = require("./../config/db-config");
const redis = require("./redis");

const client = redis.createClient();
const pipeline = [
  { $match: { "ns.db": `${dbConfig.dbName}`, "ns.coll": "orders" } }
];

const safeExit = () => client.quit();

const monitorOrders = () => {
  Order.watch(pipeline).on("change", async data => {
    if (data.operationType === "insert") {
      const orderFulfillmentRequest = JSON.stringify(data.fullDocument);
      const res = await client.rpushAsync(
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
