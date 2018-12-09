const redis = require("./../../utils/redis");
const kinvey = require("./../../utils/kinvey");

const KEY = "ordersFulfilled";
const client = redis.createClient();
const subscriber = redis.createClient();

const safeExit = () => {
  subscriber.unsubscribe();
  subscriber.quit();
  client.quit();
};

const getFulfilledOrder = async () => {
  const orderJson = await client.rpopAsync(KEY);
  const order = JSON.parse(orderJson);

  return order;
};

subscriber.on("connect", () => {
  subscriber.subscribe(`__keyspace@0__:${KEY}`, err => {
    const message = err || "Successfully subscribed to keyspace";
    console.log(message);
  });
});

subscriber.on("message", async (channel, message) => {
  if (message === "rpush") {
    const order = await getFulfilledOrder();
    await kinvey.storeData(order);
  }
});

process.on("SIGINT", safeExit);
process.on("SIGTERM", safeExit);
